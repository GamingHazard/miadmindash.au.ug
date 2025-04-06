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
import Engineering from "./courseDetailPages.jsx/Engineering";
import Health from "./courseDetailPages.jsx/Health";
import FnD from "./courseDetailPages.jsx/FashionNdesign";
import HotelMngt from "./courseDetailPages.jsx/HotelMngt";
import DIY from "./courseDetailPages.jsx/DIYprojects";
import Skills from "./courseDetailPages.jsx/TechnicalSkills";

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
        height: 700,
        overflow: "auto",
        overflowX: "hidden",
        paddingTop: 20,
      }}
    >
      {activeTab === 0 ? (
        <div className="honeycomb">
          <div
            onClick={() => handleTabClick(1)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img1} alt="Work 3" />
            <div class="honeycomb-cell_title">Agriculture</div>
          </div>
          <div
            onClick={() => handleTabClick(2)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img2} alt="Work 3" />
            <div class="honeycomb-cell_title">Technology</div>
          </div>
          <div
            onClick={() => handleTabClick(3)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img3} alt="Work 3" />
            <div class="honeycomb-cell_title">Business</div>
          </div>
          <div
            onClick={() => handleTabClick(4)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img4} alt="Work 3" />
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
            <img className="honeycomb-cell_img" src={img6} alt="Work 3" />
            <div class="honeycomb-cell_title">Fashion & Designig</div>
          </div>
          <div
            onClick={() => handleTabClick(7)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img7} alt="Work 3" />
            <div class="honeycomb-cell_title">
              HOTEL <br /> management
            </div>
          </div>
          <div
            onClick={() => handleTabClick(8)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img1} alt="Work 3" />
            <div class="honeycomb-cell_title">DIY Projects</div>
          </div>
          <div
            onClick={() => handleTabClick(9)}
            className="honeycomb-cell w3-card w3-ripple"
            style={{ cursor: "pointer" }}
          >
            <img className="honeycomb-cell_img" src={img4} alt="Work 3" />
            <div class="honeycomb-cell_title">Technical Skills</div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: 700,
            padding: 10,
            position: "relative",
            backgroundColor: "whitesmoke",
            width: 1200,
            minWidth: 800,
          }}
        >
          {activeTab === 1 && <Agriculture back={Back} />}
          {activeTab === 2 && <Tech back={Back} />}
          {activeTab === 3 && <Business back={Back} />}
          {activeTab === 4 && <Engineering back={Back} />}
          {activeTab === 5 && <Health back={Back} />}
          {activeTab === 6 && <FnD back={Back} />}
          {activeTab === 7 && <HotelMngt back={Back} />}
          {activeTab === 8 && <DIY back={Back} />}
          {activeTab === 9 && <Skills back={Back} />}
        </div>
      )}
    </div>
  );
}

export default Courses;
