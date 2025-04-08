import React, { useState, useEffect, useContext } from "react";
import Courses from "../pages/Courses";
import pic from "../assets/profile.jpg";
import "w3-css/w3.css";
import { AuthContext } from "../context/AuthContext";
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
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(1);
  const [courseForm, setCourseForm] = useState(false);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const showCourseForm = async () => {
    setCourseForm(true);
  };
  const hideCourseForm = async () => {
    setCourseForm(false);
  };

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {/* SIDEBAR */}
      <div
        class="w3-quarter w3-hide-small "
        style={{
          // paddingBottom: 10,
          height: 700,
          paddingLeft: 40,
          textAlign: "center",
        }}
      >
        <div
          className="w3-card"
          style={{
            borderRadius: 20,
            backgroundColor: "white",
            width: 170,
            paddingTop: 10,
            marginTop: 10,
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              border: "1px solid lightgrey",
              borderRadius: 8,
              padding: 5,
              margin: 10,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={() => handleTabClick(5)}
              src={pic}
              className="w3-circle w3-card"
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                cursor: "pointer",
              }}
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
              <h4>Hi, Admin</h4>
            </div>
          </div>
          <span
            style={{
              display: "flex",
            }}
            onClick={() => handleTabClick(1)}
            class="w3-bar-item w3-button w3-text-grey"
          >
            <LibraryBooks
              size={23}
              style={{ color: "grey", marginRight: 20 }}
            />{" "}
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
            onClick={logout}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 310,
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
      </div>
      <div
        className=" w3-threequarter  w3-right   "
        style={{
          display: "flex",
          height: 700,
          padding: 10,
          position: "relative",
          width: 1200,
          // backgroundColor: "white",
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
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 2,
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
