// Courses.jsx
import React, { useState } from "react";
import img1 from "../assets/img/work-1.jpg";
import img2 from "../assets/img/work-2.jpg";
import img3 from "../assets/img/work3.jpg";
import img4 from "../assets/img/work4.jpg";
import img5 from "../assets/img/work5.jpg";
import img6 from "../assets/img/work06.jpg";
import img7 from "../assets/img/work07.jpg";
import "w3-css/w3.css";

import "./honeycomb.css"; // Using existing CSS
import Agriculture from "./courseDetailPages.jsx/Agriculture";
import Tech from "./courseDetailPages.jsx/Technology";
import Business from "./courseDetailPages.jsx/Business";
import Engineiering from "./courseDetailPages.jsx/Engineering";
import Medical from "./courseDetailPages.jsx/Medical";
import FnD from "./courseDetailPages.jsx/FashionNdesign";
import FnC from "./courseDetailPages.jsx/FoodNchefering";

function Courses({}) {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const Back = async (params) => {
    setActiveTab(0);
  };
  return (
    <div
      // className="honeycomb"
      style={{
        display: "flex block",
        justifyContent: "space-evenly",
      }}
    >
      {activeTab === 0 ? (
        <div className="honeycomb">
          <div
            onClick={() => handleTabClick(1)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Agriculture</div>
          </div>
          <div
            onClick={() => handleTabClick(2)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Technology</div>
          </div>
          <div
            onClick={() => handleTabClick(3)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Business</div>
          </div>
          <div
            onClick={() => handleTabClick(4)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Engineering</div>
          </div>
          <div
            onClick={() => handleTabClick(5)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Medical</div>
          </div>
          <div
            onClick={() => handleTabClick(6)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Fashion & Designig</div>
          </div>
          <div
            onClick={() => handleTabClick(7)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img5} alt="Work 3" />
            <div class="honeycomb-cell_title">Food & Chefery</div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: 700,
            padding: 10,
            overflow: "auto",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          {activeTab === 1 && <Agriculture back={Back} />}
          {activeTab === 2 && <Tech back={Back} />}
          {activeTab === 3 && <Business back={Back} />}
          {activeTab === 4 && <Engineiering back={Back} />}
          {activeTab === 5 && <Medical back={Back} />}
          {activeTab === 6 && <FnD back={Back} />}
          {activeTab === 7 && <FnC back={Back} />}
        </div>
      )}
    </div>
  );
}

export default Courses;
