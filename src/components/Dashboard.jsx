import React, { useState, useEffect } from "react";
import Courses from "../pages/Courses";
import pic from "../assets/profile.jpg";
import "w3-css/w3.css";

import {
  LibraryBooks,
  People,
  ChatBubbleOutline,
  AnalyticsOutlined,
  Settings,
  Add,
  LogoutOutlined,
} from "@mui/icons-material";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import SettingsPage from "../pages/Settings";
import ReportsPage from "../pages/Reports";
import AnalyticsPage from "../pages/Analytics";
import CourseForm from "./CourseForm";
function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);
  const [courseForm, setCourseForm] = useState(false);
  const [agricCourseDetails, setAgricCourseDetails] = useState(false);
  const [techCourseDetails, setTechCourseDetails] = useState(false);
  const [businessCourseDetails, setBusinessCourseDetails] = useState(false);
  const [engineeringCourseDetails, setEngineeringCourseDetails] =
    useState(false);
  const [medicalCourseDetails, setMedicalCourseDetails] = useState(false);
  const [fnDCourseDetails, setFnDCourseDetails] = useState(false);
  const [fnCCourseDetails, setFnCCourseDetails] = useState(false);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const showCourseForm = async () => {
    setCourseForm(true);
  };
  const hideCourseForm = async () => {
    setCourseForm(false);
  };

  const showAgric = async () => {
    setAgricCourseDetails(true);
  };
  const hideAgric = async () => {
    setAgricCourseDetails(false);
  };
  const showTech = async () => {
    setTechCourseDetails(true);
  };
  const hideTech = async () => {
    setTechCourseDetails(false);
  };
  const showEngi = async () => {
    setEngineeringCourseDetails(true);
  };
  const hideEngi = async () => {
    setEngineeringCourseDetails(false);
  };
  const showBusi = async () => {
    setBusinessCourseDetails(true);
  };
  const hideBusi = async () => {
    setBusinessCourseDetails(false);
  };
  const showMeds = async () => {
    setMedicalCourseDetails(true);
  };
  const hideMeds = async () => {
    setMedicalCourseDetails(false);
  };
  const showFnD = async () => {
    setFnDCourseDetails(true);
  };
  const hideFnD = async () => {
    setFnDCourseDetails(false);
  };
  const showFnC = async () => {
    setFnCCourseDetails(true);
  };
  const hideFnC = async () => {
    setFnCCourseDetails(false);
  };
  return (
    <div style={{}}>
      <div
        class=" w3-bar-block w3-margin w3-card w3-third w3-hide-small "
        style={{
          width: "20%",
          backgroundColor: "whitesmoke",
          borderRadius: 20,
          paddingBottom: 10,
          height: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            margin: 20,
            border: "1px solid lightgrey",
            borderRadius: 8,
            padding: 8,
          }}
        >
          <img
            src={pic}
            className="w3-circle w3-card"
            style={{ width: 70, height: 70 }}
            alt=""
          />
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <h2>Hi, Admin</h2>
          </div>
        </div>
        <span
          style={{
            display: "flex",
          }}
          onClick={() => handleTabClick(1)}
          class="w3-bar-item w3-button w3-text-grey"
        >
          <LibraryBooks size={23} style={{ color: "grey", marginRight: 20 }} />{" "}
          <span
            style={{
              color: activeTab === 1 ? "black" : "grey",
              fontWeight: activeTab === 1 ? "bold" : "normal",
            }}
          >
            Courses
          </span>
        </span>
        <span
          style={{
            display: "flex",
          }}
          onClick={() => handleTabClick(2)}
          class="w3-bar-item w3-button w3-text-grey"
        >
          <People size={23} style={{ color: "grey", marginRight: 20 }} />
          <span
            style={{
              color: activeTab === 2 ? "black" : "grey",
              fontWeight: activeTab === 2 ? "bold" : "normal",
            }}
          >
            Users
          </span>
        </span>
        <span
          style={{
            display: "flex",
          }}
          onClick={() => handleTabClick(3)}
          class="w3-bar-item w3-button w3-text-grey"
        >
          <ChatBubbleOutline
            size={23}
            style={{ color: "grey", marginRight: 20 }}
          />
          <span
            style={{
              color: activeTab === 3 ? "black" : "grey",
              fontWeight: activeTab === 3 ? "bold" : "normal",
            }}
          >
            Reports
          </span>
        </span>
        <span
          style={{
            display: "flex",
          }}
          onClick={() => handleTabClick(4)}
          class="w3-bar-item w3-button w3-text-grey"
        >
          <AnalyticsOutlined
            size={23}
            style={{ color: "grey", marginRight: 20 }}
          />
          <span
            style={{
              color: activeTab === 4 ? "black" : "grey",
              fontWeight: activeTab === 4 ? "bold" : "normal",
            }}
          >
            Analytics
          </span>
        </span>
        <span
          style={{
            display: "flex",
          }}
          onClick={() => handleTabClick(5)}
          class="w3-bar-item w3-button w3-text-grey"
        >
          <Settings size={23} style={{ color: "grey", marginRight: 20 }} />
          <span
            style={{
              color: activeTab === 5 ? "black" : "grey",
              fontWeight: activeTab === 5 ? "bold" : "normal",
            }}
          >
            Settings
          </span>
        </span>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 340,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          class="w3-bar-item w3-button w3-text-grey"
        >
          <LogoutOutlined
            size={23}
            style={{ color: "grey", marginRight: 20 }}
          />
          Logout
        </span>
      </div>
      <div
        className=" w3-threequarter w3-margin w3-right   "
        style={{
          display: "flex",
          height: 700,
          padding: 10,
          overflow: "auto",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {activeTab === 1 && (
          <div>
            {courseForm ? (
              <CourseForm closeForm={hideCourseForm} />
            ) : (
              <Courses showForm={showCourseForm} />
            )}
          </div>
        )}
        {activeTab === 2 && <Users />}
        {activeTab === 3 && <ReportsPage />}
        {activeTab === 4 && <AnalyticsPage />}
        {activeTab === 5 && <SettingsPage />}
      </div>
      {!courseForm ? (
        <button
          onClick={showCourseForm}
          style={{
            position: "absolute",
            bottom: 20,
            right: 50,
            display: activeTab === 1 ? "flex block" : "none",
            cursor: "pointer",
          }}
        >
          Create Course{" "}
          <Add size={23} style={{ color: "grey", marginLeft: 20 }} />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
