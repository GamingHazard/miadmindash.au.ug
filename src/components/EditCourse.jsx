import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import "w3-css/w3.css";
import pic from "../assets/no-image.jpg";
import { AddAPhotoRounded, ArrowBack } from "@mui/icons-material";
import { Configs } from "./Configs";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditCourse() {
  const { DecryptData } = useContext(AuthContext);
  const { state: course } = useLocation();
  const navigate = useNavigate();

  // === Form fields ===
  const [courseName, setCourseName] = useState(course.courseName);
  const [sector, setSector] = useState(course.sector);
  const [duration, setDuration] = useState(course.duration);
  const [description, setDescription] = useState(course.description);

  // === Cover image ===
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // === Videos ===
  // existingVideos: objects from backend { url, public_Id }
  const [existingVideos, setExistingVideos] = useState(course.videos || []);
  // newVideos: File objects dropped by user
  const [newVideos, setNewVideos] = useState([]);
  // thumbnails: array of URLs (existingVideos.url + new blob URLs)
  const [videoThumbnails, setVideoThumbnails] = useState([]);

  // === UI state ===
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Build initial thumbnails from existingVideos
  useEffect(() => {
    setVideoThumbnails(existingVideos.map((v) => v.url));
  }, [existingVideos]);

  // Dropzone for new videos
  const onDrop = useCallback((acceptedFiles) => {
    const maxSize = 300 * 1024 * 1024;
    const validFiles = [];
    const newThumbs = [];

    acceptedFiles.forEach((file) => {
      if (file.size <= maxSize) {
        validFiles.push(file);
        newThumbs.push(URL.createObjectURL(file));
      } else {
        setError(`File ${file.name} is too large (max 300MB).`);
      }
    });

    if (validFiles.length) {
      setNewVideos((prev) => [...prev, ...validFiles]);
      setVideoThumbnails((prev) => [...prev, ...newThumbs]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    multiple: true,
    maxSize: 300 * 1024 * 1024,
    onDrop,
  });

  // Cover image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage({ file, preview: reader.result });
      reader.readAsDataURL(file);
    } else {
      setError("Please select a valid image file.");
    }
  };
  const handleImageClick = () => fileInputRef.current.click();

  // Upload cover image
  const uploadToCloudinary = async () => {
    if (!image?.file) return course.coverImage;
    const { data } = await axios.get(
      `${Configs.url}/cloudinary-signature/${Configs.presets.coverImages}`
    );
    const { signature, timestamp } = data;
    const fd = new FormData();
    fd.append("file", image.file);
    fd.append("upload_preset", Configs.presets.coverImages);
    fd.append("timestamp", timestamp);
    fd.append("signature", signature);
    fd.append("api_key", Configs.api_key);
    const resp = await axios.post(
      `https://api.cloudinary.com/v1_1/${Configs.cloudName}/image/upload`,
      fd
    );
    return { url: resp.data.secure_url, public_Id: resp.data.public_id };
  };

  // Upload new videos
  const uploadVideosToCloudinary = async (files) => {
    const promises = files.map(async (video) => {
      const { data } = await axios.get(
        `${Configs.url}/cloudinary-signature/${Configs.presets.videos}`
      );
      const { signature, timestamp } = data;
      const fd = new FormData();
      fd.append("file", video);
      fd.append("upload_preset", Configs.presets.videos);
      fd.append("timestamp", timestamp);
      fd.append("signature", signature);
      fd.append("api_key", Configs.api_key);
      const r = await axios.post(
        `https://api.cloudinary.com/v1_1/${Configs.cloudName}/video/upload`,
        fd
      );
      return { url: r.data.secure_url, public_Id: r.data.public_id };
    });
    return Promise.all(promises);
  };

  // Save (PATCH) handler
  const saveCourse = async () => {
    setLoading(true);
    setError("");

    try {
      // 1) upload cover if changed
      const cover = await uploadToCloudinary();

      // 2) upload only new videos
      const uploaded = newVideos.length
        ? await uploadVideosToCloudinary(newVideos)
        : [];

      // 3) merge existing + newly uploaded
      const finalVideos = [...existingVideos, ...uploaded];

      // 4) build payload
      const adminId = DecryptData(localStorage.getItem("adminID"));
      const payload = {
        courseName: courseName,
        sector: sector,
        duration: duration,
        description: description.trim(),
        coverImage: cover,
        videos: finalVideos,
        adminId: adminId,
      };

      // 5) send PATCH
      await axios.patch(`${Configs.url}/update-course/${course._id}`, payload);

      alert("Course updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError(err.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 1200, margin: "auto" }}>
      {/* Header */}
      <div
        className="w3-panel"
        style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w3-left"
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <ArrowBack style={{ marginRight: 4 }} /> Back
        </button>
        <div
          style={{
            flex: 1,

            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Editing Course</h2>
        </div>
        <button
          onClick={saveCourse}
          className="w3-right"
          style={{ padding: "0 16px" }}
        >
          {loading ? (
            <span
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              updating
              <CircularProgress
                style={{ marginLeft: 5 }}
                color="white"
                size={15}
              />
            </span>
          ) : (
            "Update"
          )}
        </button>
      </div>

      {/* Cover & Form */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {/* Cover */}
        <div style={{ position: "relative", width: 300, height: 300 }}>
          <img
            src={image ? image.preview : course.coverImage.url || pic}
            alt="cover"
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
          <AddAPhotoRounded
            onClick={handleImageClick}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              fontSize: 40,
              cursor: "pointer",
              color: "grey",
            }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* Fields */}
        <div style={{ flex: 1 }}>
          <label>Course Name</label>
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w3-input"
          />

          <label>Sector</label>
          <input
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w3-input"
          />

          <label>Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w3-input"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w3-input"
            style={{ height: 120 }}
          />
        </div>
      </div>

      {/* Video Dropzone */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed grey",
          padding: 20,
          textAlign: "center",
          marginTop: 30,
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop videos here, or click to select</p>
        <small>Max size: 300MB each</small>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Video Previews */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 10,
          marginTop: 20,
          padding: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        {videoThumbnails.length > 0 ? (
          videoThumbnails.map((src, i) => (
            <video
              key={i}
              src={src}
              width={200}
              height={120}
              style={{ objectFit: "cover", borderRadius: 6 }}
              controls
            />
          ))
        ) : (
          <p>No videos selected</p>
        )}
      </div>
    </div>
  );
}

export default EditCourse;
