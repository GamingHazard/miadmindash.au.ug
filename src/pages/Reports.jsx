import React from "react";
import pic from "../assets/profile.jpg";
import "w3-css/w3.css";
function ReportsPage() {
  return (
    <div>
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
          <b>User Name</b>: John Dev <br />
          <b>Email</b>:johndev@gmail.com <br />
          <b>Report Description</b>: Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Enim dolorem asperiores quaerat autem vitae deserunt
          assumenda ratione eveniet vero aliquam accusamus tenetur eum,
          accusantium illo necessitatibus. Maiores tempore ullam libero?
          {/* <div
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
          </div> */}
        </div>
        <div style={{ height: "100%", width: 200 }}>
          <textarea
            className="w3-card"
            placeholder="reply..."
            style={{
              height: "80%",
              maxHeight: "80%",
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              minHeight: "80%",
              border: "none",
              borderTopRightRadius: 20,
              padding: 10,
            }}
          ></textarea>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 4,
              position: "absolutes",
            }}
          >
            <button
              // className="w3-hover-maroon"
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              Delete
            </button>
            <button style={{ paddingLeft: 10, paddingRight: 10 }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
