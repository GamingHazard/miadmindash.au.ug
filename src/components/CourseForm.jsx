import React, { useState, useRef, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import "w3-css/w3.css";
import pic from "../assets/no-image.jpg";
import { AddAPhotoRounded, ArrowBack, Description } from "@mui/icons-material";
import { Configs, Options } from "./Configs";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
function CourseForm({ closeForm }) {
  const { DecryptData } = useContext(AuthContext);

  const [videos, setVideos] = useState([]);
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [courseName, setCourseName] = useState("");
  const [sector, setSector] = useState(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const savedId = localStorage.getItem("adminID");
  const [successMsg, setSuccessMsg] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleChange = (option) => {
    setSector(option);
  };

  const Success = (msg) => toast.success(msg);
  const Error = (msg) => toast.error(msg);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMsg(true);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Dropzone settings for video uploads
  const onDrop = useCallback(
    (acceptedFiles) => {
      const maxSize = 300 * 1024 * 1024; // 30MB limit
      const validVideos = [];
      const thumbnails = [];

      acceptedFiles.forEach((file) => {
        if (file.size <= maxSize) {
          validVideos.push(file);
          thumbnails.push(URL.createObjectURL(file));
        } else {
          setError(`File ${file.name} is too large. Maximum size is 30MB.`);
        }
      });

      if (validVideos.length > 0) {
        setVideos([...videos, ...validVideos]);
        setVideoThumbnails([...videoThumbnails, ...thumbnails]);
      }
    },
    [videos, videoThumbnails]
  );

  // Use Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    multiple: true,
    maxSize: 300 * 1024 * 1024, // 30MB limit
    onDrop,
  });
  // upload the course cover image to cloudinary
  const uploadToCloudinary = async () => {
    if (!image?.file) return null;

    // fetch signature
    let signatureData;
    try {
      const { data } = await axios.get(
        `${Configs.url}/cloudinary-signature/${Configs.presets.coverImages}`
      );
      signatureData = data;
    } catch (err) {
      console.error("Error fetching image signature:", err);
      throw new Error("Could not get upload signature for cover image.");
    }

    const { signature, timestamp } = signatureData;
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", Configs.presets.coverImages);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("api_key", Configs.api_key);

    try {
      const resp = await axios.post(
        `https://api.cloudinary.com/v1_1/${Configs.cloudName}/image/upload`,
        formData
      );
      return {
        url: resp.data.secure_url,
        public_Id: resp.data.public_id,
      };
    } catch (err) {
      console.error("Error uploading cover image:", err);
      throw new Error("Cover image  failed to upload, try again.");
    }
  };
  // utility to upload videos to Cloudinary
  const uploadVideosToCloudinary = async (videos) => {
    if (videos.length === 0) {
      throw new Error("No videos selected.");
    }

    // map each video to a promise
    const uploadPromises = videos.map(async (video, idx) => {
      // get signature for this video
      const { data } = await axios.get(
        `${Configs.url}/cloudinary-signature/${Configs.presets.videos}`
      );
      const { signature, timestamp } = data;

      const formData = new FormData();
      formData.append("file", video);
      formData.append("upload_preset", Configs.presets.videos);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", Configs.api_key);

      const uploadResp = await axios.post(
        `https://api.cloudinary.com/v1_1/${Configs.cloudName}/video/upload`,
        formData
      );

      return {
        url: uploadResp.data.secure_url,
        public_Id: uploadResp.data.public_id,
      };
    });

    // wait for all or throw on first failure
    return Promise.all(uploadPromises);
  };

  const saveCourse = async () => {
    setLoading(true);

    try {
      if (!image) throw new Error("Please select a cover image.");
      if (videos.length === 0)
        throw new Error("Please select at least one video.");

      // 1) upload cover image
      const imageUrl = await uploadToCloudinary();

      // 2) upload all videos
      const uploadedVideos = await uploadVideosToCloudinary(videos);

      // 3) build payload
      const adminID = DecryptData(savedId);
      const formData = {
        courseName: courseName,
        sector: sector.value,
        duration: duration,
        description: description.trim(),
        coverImage: imageUrl,
        videos: uploadedVideos,
        adminId: adminID,
      };

      console.log(formData);

      // 4) send to your backend
      const res = await axios.post(`${Configs.url}/create-course`, formData);

      if (res.status === 201) {
        Success("Course created successfully 👍");
        // reset form
        setCourseName("");
        setSector("");
        setDuration("");
        setDescription("");
        setImage(null);
        setVideos([]);
        setVideoThumbnails([]);
      } else {
        throw new Error("Backend returned status " + res.status);
      }
    } catch (err) {
      Error("failed to create course, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 1200 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
          paddingRight: 16,
        }}
        className="w3-panel"
      >
        <button
          onClick={closeForm}
          style={{
            display: "flex",
            paddingRight: 10,
            paddingLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          className="w3-left"
        >
          <ArrowBack
            className="w3-ripple"
            style={{
              color: "grey",
              cursor: "pointer",
              fontSize: 20,
            }}
          />
          <b style={{ flex: 1 }}>Back</b>
        </button>
        <div style={{ flex: 1 }} />

        <button
          className="w3-right"
          onClick={saveCourse}
          style={{
            cursor: "pointer",
            paddingLeft: 10,
            paddingRight: 10,
            marginRight: 30,
          }}
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
              Saving
              <CircularProgress
                style={{ marginLeft: 5 }}
                color="white"
                size={15}
              />
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <form>
        {" "}
        <div style={{ display: "flex", marginTop: 50 }}>
          <div
            style={{
              width: 300,
              height: 300,
              position: "relative",
              backgroundColor: "white",
            }}
          >
            {image ? (
              <img
                src={image.preview}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  borderRadius: 10,
                }}
                alt="Course Thumbnail"
              />
            ) : (
              <img
                src={pic}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  borderRadius: 10,
                }}
                alt="Course Thumbnail"
              />
            )}

            <AddAPhotoRounded
              onClick={handleButtonClick}
              className="w3-ripple"
              style={{
                color: "grey",
                position: "absolute",
                bottom: 10,
                right: 10,
                cursor: "pointer",
                fontSize: 50,
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>

          <div style={{ padding: 10, flex: 1 }}>
            <label>Course Name</label>
            <br />
            <input
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              style={{ width: 400, paddingLeft: 10, paddingRight: 10 }}
              type="text"
            />

            <br />
            <br />
            <label>Sector</label>
            <br />
            <div style={{ width: 400 }}>
              <Select
                value={sector}
                onChange={handleChange}
                options={Options}
                placeholder="Select Course Sector..."
                isClearable
              />
            </div>
            <br />
            <label>Duration</label>
            <br />
            <input
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              style={{ width: 400, paddingLeft: 10, paddingRight: 10 }}
              type="text"
            />
          </div>

          <div className="w3-right">
            <label>Description</label>
            <br />
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="enter text..."
              style={{
                height: 260,
                marginRight: 10,
                padding: 10,
                maxHeight: 260,
                minWidth: 400,
                maxWidth: 400,
                minHeight: 260,
              }}
              name=""
              id=""
            ></textarea>
          </div>
        </div>
        {/* Dropzone Area for Drag & Drop */}
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed grey",
            padding: 20,
            textAlign: "center",
            cursor: "pointer",
            marginTop: 20,
          }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop videos here, or click to select</p>
          <p style={{ fontSize: 12, color: "grey" }}>Max file size: 300MB</p>
        </div>
        {/* Show error message if any */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Video Thumbnails Preview */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            overflowX: "auto",
            backgroundColor: "whitesmoke",
            borderRadius: 20,
            height: 220,
            marginTop: 10,
            width: "100%",
          }}
        >
          {videoThumbnails.length > 0 ? (
            videoThumbnails.map((thumbnail, index) => (
              <video
                key={index}
                src={thumbnail}
                width="200"
                height="200"
                style={{
                  objectFit: "cover",
                  borderRadius: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                controls
                controlsList="seek"
              />
            ))
          ) : (
            <p>No videos selected</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
