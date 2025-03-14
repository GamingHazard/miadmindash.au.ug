import React from "react";
import pic from "../assets/profile.jpg";
import "w3-css/w3.css";
function Users() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <div
        className="w3-card"
        style={{
          height: 190,
          width: "45%",
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
          <b>User Names</b>: john Dev <br />
          <b>Gender</b>:Male <br />
          <b>Courses enrolled</b>: 7 <br />
          <b>Finished Courses</b>: 4
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <div
              className="w3-ripple"
              style={{
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "crimson", // Violet to Pink gradient
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: "pointer",
                border: "none",
                display: "flex",
                padding: 10,
              }}
            >
              Delete
            </div>
            <div
              className="w3-ripple"
              style={{
                width: 50,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "maroon", // Violet to Pink gradient
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: "pointer",
                border: "none",

                display: "flex",
              }}
            >
              Block
            </div>
          </div>
        </div>
      </div>
      <div
        className="w3-card"
        style={{
          height: 190,
          width: "45%",
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
          <b>User Names</b>: john Dev <br />
          <b>Gender</b>:Male <br />
          <b>Courses enrolled</b>: 7 <br />
          <b>Finished Courses</b>: 4
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <div
              className="w3-ripple"
              style={{
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "crimson", // Violet to Pink gradient
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: "pointer",
                border: "none",
                display: "flex",
                padding: 10,
              }}
            >
              Delete
            </div>
            <div
              className="w3-ripple"
              style={{
                width: 50,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "maroon", // Violet to Pink gradient
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: "pointer",
                border: "none",

                display: "flex",
              }}
            >
              Block
            </div>
          </div>
        </div>
      </div>
      <div
        className="w3-card"
        style={{
          height: 190,
          width: "45%",
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
          <b>User Names</b>: john Dev <br />
          <b>Gender</b>:Male <br />
          <b>Courses enrolled</b>: 7 <br />
          <b>Finished Courses</b>: 4
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <div
              className="w3-ripple"
              style={{
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "crimson", // Violet to Pink gradient
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: "pointer",
                border: "none",
                display: "flex",
                padding: 10,
              }}
            >
              Delete
            </div>
            <div
              className="w3-ripple"
              style={{
                width: 50,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "maroon", // Violet to Pink gradient
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: "pointer",
                border: "none",

                display: "flex",
              }}
            >
              Block
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
