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
import { Configs, Options } from "./Configs";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCourse() {
  const { DecryptData } = useContext(AuthContext);
  const { state: course } = useLocation();
  const navigate = useNavigate();

  // === Form fields ===
  const [courseName, setCourseName] = useState(course.courseName);
  const [duration, setDuration] = useState(course.duration);
  const [description, setDescription] = useState(course.description);
  const initialSectorOption = Options.find(
    (opt) => opt.value === course.sector
  );
  const [sector, setSector] = useState(initialSectorOption);

  // === Cover image ===
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const Success = (msg) => toast.success(msg);
  const Error = (msg) => toast.error(msg);

  // === Videos ===
  const [existingVideos, setExistingVideos] = useState(course.videos || []);
  const [newVideos, setNewVideos] = useState([]);
  const [videoThumbnails, setVideoThumbnails] = useState([]);

  // === UI state ===
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // === Progress tracking state ===
  const [coverProgress, setCoverProgress] = useState(0);
  // store video progress as an object, e.g., { filename1: progress, filename2: progress, ... }
  const [videoProgress, setVideoProgress] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);

  // Calculate overall progress when coverProgress or videoProgress changes.
  useEffect(() => {
    // weight: cover image has weight 1, each video file weight 1
    const videoFilesCount =
      newVideos.length || Object.keys(videoProgress).length;
    const totalWeight = 1 + videoFilesCount;
    const videoTotal =
      Object.values(videoProgress).reduce((acc, curr) => acc + curr, 0) ||
      videoFilesCount * 100;
    const avgVideo = videoFilesCount > 0 ? videoTotal / videoFilesCount : 100;
    const overall = (coverProgress + avgVideo * videoFilesCount) / totalWeight;
    setOverallProgress(Math.round(overall));
  }, [coverProgress, videoProgress, newVideos.length]);

  // Initialize thumbnails for existing videos
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
      Error("Please select a valid image file.");
    }
  };
  const handleImageClick = () => fileInputRef.current.click();

  // Upload cover image with progress tracking
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
      fd,
      {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setCoverProgress(progress);
        },
      }
    );
    return { url: resp.data.secure_url, public_Id: resp.data.public_id };
  };

  // Upload new videos with progress tracking
  const uploadVideosToCloudinary = async (files) => {
    // Create an array of promises while tracking each video’s progress
    const promises = files.map((video) =>
      axios
        .get(`${Configs.url}/cloudinary-signature/${Configs.presets.videos}`)
        .then(({ data }) => {
          const { signature, timestamp } = data;
          const fd = new FormData();
          fd.append("file", video);
          fd.append("upload_preset", Configs.presets.videos);
          fd.append("timestamp", timestamp);
          fd.append("signature", signature);
          fd.append("api_key", Configs.api_key);
          return axios
            .post(
              `https://api.cloudinary.com/v1_1/${Configs.cloudName}/video/upload`,
              fd,
              {
                onUploadProgress: (progressEvent) => {
                  const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  );
                  // Use the file’s name as a key to store its progress.
                  setVideoProgress((prev) => ({
                    ...prev,
                    [video.name]: progress,
                  }));
                },
              }
            )
            .then((r) => ({
              url: r.data.secure_url,
              public_Id: r.data.public_id,
            }));
        })
    );
    return Promise.all(promises);
  };

  // Save (PATCH) handler
  const saveCourse = async () => {
    setLoading(true);
    setError("");
    // Reset progress (if needed)
    setCoverProgress(0);
    setVideoProgress({});

    try {
      // 1) Upload cover if changed
      const cover = await uploadToCloudinary();

      // 2) Upload only new videos
      const uploadedVideos = newVideos.length
        ? await uploadVideosToCloudinary(newVideos)
        : [];

      // 3) Merge existing + newly uploaded videos
      const finalVideos = [...existingVideos, ...uploadedVideos];

      // 4) Build payload
      const adminId = DecryptData(localStorage.getItem("adminID"));
      const payload = {
        courseName: courseName,
        sector: sector.value,
        duration: duration,
        description: description.trim(),
        coverImage: cover,
        videos: finalVideos,
        adminId: adminId,
      };

      // 5) Send PATCH request
      await axios.patch(`${Configs.url}/update-course/${course._id}`, payload);

      Success("Course updated successfully 👍");
      navigate(-1);
    } catch (err) {
      Error(err.message || "Update failed.");
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

      {/* Overall Upload Progress Bar */}
      {loading && (
        <div style={{ marginBottom: 20 }}>
          <LinearProgress variant="determinate" value={overallProgress} />
          <p>{overallProgress}% completed</p>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />

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

        {/* Form Fields */}
        <div style={{ flex: 1 }}>
          <label>Course Name</label>
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w3-input"
          />

          <label>Sector</label>
          <div style={{ width: 400 }}>
            <Select
              value={sector}
              onChange={setSector}
              options={Options}
              placeholder="Select Course Sector..."
              isClearable
            />
          </div>
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
