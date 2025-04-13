import React from "react";
import pic from "../assets/no-image.jpg";
import "w3-css/w3.css";
function Users() {
  return (
    <div
      style={{
        flexWrap: "wrap",
        width: 1200,
      }}
    >
      <div
        style={{
          height: 190,
          width: "90%",
          display: "flex",
          margin: 10,
          paddingBottom: 10,
          borderBottom: "0.5px solid lightgrey",
        }}
      >
        <img
          src={pic}
          style={{
            width: 200,
            height: 180,
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
            height: 150,
            marginBottom: 10,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <b>Names</b>: john Dev <br />
          <b>Gender</b>:Male <br />
          <b>Courses enrolled</b>: 7 <br />
          <b>Finished Courses</b>: 4
          <br />
          <b>Reviews</b>: 1 <br />
          <b>Reports</b>: 0
          <div
            style={{
              display: "flex",
              // marginTop: 10,
            }}
          >
            <button style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}>
              Delete
            </button>
            <button style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}>
              Barn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
