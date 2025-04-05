import pic from "../../assets/no-image.jpg";
import React, { useState } from "react";
import "w3-css/w3.css";

import { ArrowBack } from "@mui/icons-material";
function Tech({ back }) {
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

      {/* CARD */}
      <div
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
        <img src={pic} width={200} height={200} alt="" />
        <div
          style={{
            flex: 1,
            padding: 16,
            textAlign: "left",
            display: "flex",
          }}
        >
          {" "}
          {/* profile */}
          <div style={{ width: 230 }}>
            <b>Course Name:</b> Machine repair <br /> <br />
            <b>Course Category:</b> Agriculture <br /> <br />
            <b>Video Resources:</b> 102 <br /> <br />
            <b>Video duration:</b> 30 mins <br /> <br />
          </div>
          {/* description */}
          <div
            style={{
              flex: 1,
              flexWrap: "wrap",

              display: "flex",
            }}
          >
            <h3>
              <b>Discription</b>
            </h3>
            <p>
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo,
              reiciendis eos nostrum est fugiat, dignissimos amet vero officia
              cum delectus eligendi veniam dolores vel, optio rerum! Suscipit
              laudantium facilis amet? Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Nemo, reiciendis eos nostrum est fugiat,
              dignissimos amet vero officia cum delectus eligendi veniam dolores
              adipisicing elit. Nemo, reiciendis eos nostrum est fugiat,
              dignissimos amet vero officia cum delectus eligendi veniam dolores
            </p>
          </div>
        </div>

        <span
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 1,
            right: 10,
            justifyContent: "space-evenly",
          }}
        >
          {" "}
          <button style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}>
            Edit
          </button>
          <button style={{ margin: 10, paddingLeft: 10, paddingRight: 10 }}>
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}

export default Tech;
