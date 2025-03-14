import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "w3-css/w3.css";
import pic from "../assets/no-image.jpg";
import { AddAPhotoRounded, ArrowBack } from "@mui/icons-material";

function CourseForm({ closeForm }) {
  const [videos, setVideos] = useState([]);
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const fileInputRef = useRef(null);

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
      const maxSize = 30 * 1024 * 1024; // 30MB limit
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
    maxSize: 30 * 1024 * 1024, // 30MB limit
    onDrop,
  });

  return (
    <div>
      <button onClick={closeForm} style={{ display: "flex" }}>
        <ArrowBack
          className="w3-ripple"
          style={{
            color: "grey",
            cursor: "pointer",
            fontSize: 30,
          }}
        />
        Back
      </button>

      <div style={{ display: "flex", marginTop: 50 }}>
        <div style={{ width: 300, height: 300, position: "relative" }}>
          {image && (
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
          <input style={{ width: 400 }} type="text" />
          <br />
          <label>Sector</label>
          <br />
          <input style={{ width: 400 }} type="text" />
          <br />
          <label>Duration</label>
          <br />
          <input style={{ width: 400 }} type="text" />
        </div>

        <div className="w3-right">
          <label>Description</label>
          <br />
          <textarea
            style={{
              height: 260,
              marginRight: 10,
              padding: 10,
              maxHeight: 260,
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
        <p style={{ fontSize: 12, color: "grey" }}>Max file size: 30MB</p>
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
          height: 200,
          marginTop: 10,
        }}
      >
        {videoThumbnails.length > 0 ? (
          videoThumbnails.map((thumbnail, index) => (
            <video
              key={index}
              src={thumbnail}
              width="100"
              height="100"
              controls
              style={{
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          ))
        ) : (
          <p>No videos selected</p>
        )}
      </div>

      <button style={{ width: "100%", marginTop: 20, cursor: "pointer" }}>
        Save
      </button>
    </div>
  );
}

export default CourseForm;
