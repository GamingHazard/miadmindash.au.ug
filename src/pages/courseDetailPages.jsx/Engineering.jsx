import React, { useEffect, useState } from "react";
import axios from "axios";
import "w3-css/w3.css";
import { ArrowBack } from "@mui/icons-material";
import { Configs } from "../../components/Configs";
import { CircularProgress } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Engineering({ back }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const editCorse = (course) => {
    navigate("/editcourse", { state: course });
  };

  useEffect(() => {
    fetchCourses();
  }, []); // Ensure 'category' is being passed correctly
  const fetchCourses = async () => {
    try {
      const category = "engineering";

      const res = await axios.get(`${Configs.url}/course/${category}`); // Make sure `category` is passed
      console.log("Fetched Courses: ", res.data.courses); // Log the courses

      if (Array.isArray(res.data.courses)) {
        setCourses(res.data.courses); // Make sure to set the correct array
      } else {
        console.error("Expected an array but got: ", res.data.courses);
        setError("No courses available.");
      }
    } catch (err) {
      setError("Failed to load courses. please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete
  const deleteCourse = async (courseId) => {
    setLoading2(true);
    try {
      const res = await axios.delete(
        `${Configs.url}/delete-course/${courseId}`
      );
      if (res.status === 200) {
        // Remove the deleted course from the UI without needing to re-fetch
        setCourses(courses.filter((course) => course._id !== courseId));
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      setError("Failed to delete course.");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        textAlign: "center",
        overflow: "auto",
        overflowX: "hidden",
      }}
    >
      <div
        className="w3-panel w3-teal"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowBack
          onClick={back}
          className="w3-ripple w3-left"
          style={{ color: "white", marginRight: 20, cursor: "pointer" }}
        />
        <h2 style={{ flex: 1 }}>ENGINEERING COURSES</h2>
      </div>

      {loading && (
        <p style={{ flex: 1 }}>
          Loading courses...{" "}
          <CircularProgress style={{ marginLeft: 5 }} color="white" size={15} />
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error} <br /> <br />
          <Refresh
            onClick={fetchCourses}
            style={{ marginLeft: 5, cursor: "pointer" }}
            color="white"
            size={15}
            className="w3-ripple"
          />{" "}
        </p>
      )}

      {!loading && courses.length === 0 && (
        <p style={{ marginTop: 20 }}>No courses available.</p>
      )}

      {courses.map((course, index) => (
        <div
          key={index}
          className="w3-card"
          style={{
            borderRadius: 15,
            padding: 10,
            margin: 16,
            display: "flex",
            backgroundColor: "white",
            height: 240,
            width: "95%",
            position: "relative",
          }}
        >
          <img
            src={course.coverImage?.url || "/no-image.jpg"}
            width={200}
            height={200}
            alt="cover"
          />

          <div
            style={{
              flex: 1,
              padding: 16,
              textAlign: "left",
              display: "flex",
            }}
          >
            {/* Course Info */}
            <div
              style={{
                width: 230,
                borderRight: "solid 0.5px lightgrey ",
                marginRight: 10,
              }}
            >
              <b>Course Name:</b> {course.courseName} <br /> <br />
              <b>Course Category:</b> {course.sector} <br /> <br />
              <b>Video Resources:</b> {course.videos?.length || 0} videos
              <br /> <br />
              <b>Course Duration:</b> {course.duration} <br /> <br />
            </div>

            {/* Description */}
            <div
              style={{
                flex: 1,
                flexWrap: "wrap",
                // display: "flex",
                flexDirection: "column",
              }}
            >
              <h3>
                <b>Description</b>
              </h3>
              <p>{course.description}</p>
            </div>
          </div>

          {/* Edit/Delete Buttons */}
          <span
            style={{
              display: "flex",
              position: "absolute",
              zIndex: 1,
              right: 10,
              justifyContent: "space-evenly",
            }}
          >
            <button
              onClick={() => {
                editCorse(course);
              }}
              style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteCourse(course._id);
              }}
              style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}
            >
              {loading2 ? (
                <span
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Deleting...
                  <CircularProgress
                    style={{ marginLeft: 5 }}
                    color="white"
                    size={15}
                  />
                </span>
              ) : (
                "Delete"
              )}
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Engineering;
