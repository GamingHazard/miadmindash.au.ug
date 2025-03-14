import React from "react";
import "w3-css/w3.css";
function AnalyticsPage() {
  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        className="w3-card"
        style={{
          justifyContent: "space-evenly",
          display: "flex",
          flexWrap: "wrap",
          padding: 15,
          margin: 10,
          borderRadius: 20,
          height: 300,
        }}
      >
        <div
          style={{
            margin: 10,
            width: 150,
            height: 150,
            textAlign: "center",
          }}
        >
          <h2>Users</h2>
          <div
            className="w3-card w3-ripple"
            style={{
              flex: 1,
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 20,
              backgroundColor: "purple",
              color: "white",
              height: "100%",
              display: "flex",
            }}
          >
            120 <br />
            users
          </div>
        </div>
        <div
          style={{
            margin: 10,
            width: 150,
            height: 150,
            textAlign: "center",
          }}
        >
          <h2>Reports</h2>
          <div
            className="w3-card w3-ripple"
            style={{
              flex: 1,
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 20,
              backgroundColor: "Green",
              color: "white",
              height: "100%",
              display: "flex",
            }}
          >
            430 <br />
            reports
          </div>
        </div>
        <div
          style={{
            margin: 10,
            width: 150,
            height: 150,
            textAlign: "center",
          }}
        >
          <h2>Videos</h2>
          <div
            className="w3-card w3-ripple"
            style={{
              flex: 1,
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 20,
              backgroundColor: "royalblue",
              color: "white",
              height: "100%",
              display: "flex",
            }}
          >
            1043 <br />
            videos
          </div>
        </div>
        <div
          style={{
            margin: 10,
            width: 150,
            height: 150,
            textAlign: "center",
          }}
        >
          <h2>Replies</h2>
          <div
            className="w3-card w3-ripple"
            style={{
              flex: 1,
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 20,
              backgroundColor: "teal",
              color: "white",
              height: "100%",
              display: "flex",
            }}
          >
            43 <br />
            replies
          </div>
        </div>
        <div
          style={{
            margin: 10,
            width: 150,
            height: 150,
            textAlign: "center",
          }}
        >
          <h2>Deleted</h2>
          <div
            className="w3-card w3-ripple"
            style={{
              flex: 1,
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 20,
              backgroundColor: "crimson",
              color: "white",
              height: "100%",
              display: "flex",
            }}
          >
            50 <br />
            users
          </div>
        </div>
      </div>

      <br />
    </div>
  );
}

export default AnalyticsPage;
