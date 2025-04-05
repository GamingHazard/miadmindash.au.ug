import React, { useEffect, useState } from "react";
import axios from "axios";
import "w3-css/w3.css";
import { ArrowBack } from "@mui/icons-material";
import { Configs } from "../../components/Configs";

function Tech({ back }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const category = "technology";

        const res = await axios.get(`${Configs.url}/course/${category}`); // Make sure `category` is passed
        console.log("Fetched Courses: ", res.data.courses); // Log the courses

        if (Array.isArray(res.data.courses)) {
          setCourses(res.data.courses); // Make sure to set the correct array
        } else {
          console.error("Expected an array but got: ", res.data.courses);
          setError("No courses available.");
        }
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Ensure 'category' is being passed correctly

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
        <h2 style={{ flex: 1 }}>TECHNOLOGY COURSES</h2>
      </div>

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
            <button style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}>
              Edit
            </button>
            <button style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}>
              Delete
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Tech;
