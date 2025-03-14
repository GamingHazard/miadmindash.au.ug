import React from "react";
import pic from "../assets/profile.jpg";
import "w3-css/w3.css";

function CourseDetails({ route, showForm }) {
  const { courseSector } = route.params;
  return (
    <div style={{ flex: 1, height: 700 }}>
      <h2>{courseSector}</h2>
      <div
        className="w3-card"
        style={{
          height: 190,
          width: "100%",
          borderRadius: 20,
          display: "flex",
          marginBottom: 10,
        }}
      >
        <img
          src={pic}
          style={{
            width: 200,
            height: 190,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          alt=""
        />
        <div
          style={{
            padding: 10,
            flex: 1,
            backgroundColor: "whitesmoke",
            color: "black",
            height: 190,
            marginBottom: 10,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <b>Course Name</b>: ICT <br />
          <b>Category</b>:IT <br />
          <b>Videos</b>: 28 <br />
          <b>Duration</b>: 23hrs <br /> <b>Description</b>: Lorem ipsum dolor
          sit amet consectetur, adipisicing elit. Enim dolorem asperiores
          quaerat autem vitae deserunt assumenda ratione eveniet vero aliquam
          accusamus tenetur eum, accusantium illo necessitatibus. Maiores
          tempore ullam libero?
          <div
            onClick={showForm}
            className="w3-ripple"
            style={{
              width: 50,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "grey", // Violet to Pink gradient
              color: "white",
              fontWeight: "bold",
              borderRadius: 8,
              cursor: "pointer",
              border: "none",
              position: "absolute",
              zIndex: 1,
              top: 30,
              right: 70,
              display: "flex",
            }}
          >
            Edit
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
