import React, { useState, useContext } from "react";
import "w3-css/w3.css";
import axios from "axios";
import pic from "../assets/profile.jpg";
import { Configs } from "../components/Configs";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [names, setNames] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const { adminID, logout, EncryptData, DecryptData } = useContext(AuthContext);

  const updatePassword = async () => {
    setLoading(true);
    const currentPassword = oldPassword;
    const newPassword = password;

    try {
      const response = await axios.patch(
        `${Configs.url}/change-password/${adminID}`,
        {
          currentPassword,
          newPassword,
        }
      );
      if (response.status === 200) {
        setSuccessMsg(true);
        setSuccessTxt("password changed Successfully ✔ ");
        setCurrentPassword("");
        setNewPassword("");
        setPassword("");
      }
    } catch (error) {
      setErrorMsg(true);
      setErrorTxt(`Failed to update password.${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const data = {
        names: names,
        email: email,
        contact: contact,
        recoveryEmail: recoveryEmail,
      };
      const response = await axios.patch(`${Configs.url}/update-admin`, data);
      if (response.status === 200) {
        const profile = response.data.admin;
        console.log(profile);

        let safeData = EncryptData(JSON.stringify(profile));
        localStorage.setItem("profile", safeData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // function for requesting verification  code
  const getCode = async (e) => {
    setLoading2(true);
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recoveryEmail)) {
      alert("Please provide a valid email address.");
      setLoading2(false);
      return;
    }
    const data = { email: recoveryEmail?.trim(), id: adminID };
    try {
      const response = await axios.post(
        `${Configs.url}/verification-code`,
        data
      );
      if (response.status === 200) {
        setSuccessMsg(true);
        setVerifyFeild(true);
      }
    } catch (error) {
      setErro(true);
      if (error.message === "Request failed with status code 404") {
        setErroMsg("sorry!, email address not found");
      } else {
        setErroMsg(
          "Failed to send the code, please check the email and try again "
        );
      }

      console.log(error.message);
    } finally {
      setLoading2(false);
    }
  };

  // function for verifying the code
  const verifyCode = async (e) => {
    setLoading3(true);
    const data = {
      email: recoveryEmail?.trim(),
      code: verificationCode?.trim(),
    };
    console.log(data);

    try {
      const response = await axios.post(`${Configs.url}/verify-email`, data);

      // Redirect to reset password page
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading3(false);
    }
  };

  const deleteAccount = async () => {
    setLoading4(false);
    try {
      const data = { id: adminID, password: password };

      const response = await axios.delete(`${Configs.url}/delete-admin`, data);
      if (response.status === 200) {
        logout();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading4(false);
    }
  };
  return (
    <div style={{ flex: 1, overflow: "auto", overflowX: "hidden" }}>
      {/* SECURITY SECTION */}
      <div>
        <h2 style={{ color: "lightgrey" }}>Security</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* Recovery  email */}
          <div
            className="w3-card"
            style={{
              borderRadius: 20,
              marginBottom: 10,
              padding: 10,
              width: "100%",
              height: 330,
              textAlign: "center",
              margin: 10,
              width: 330,
            }}
          >
            <h3>Set backup email</h3>
            Set up a backup email address that will be used to recover your
            account just in case you forget your current email address.
            <br />
            <br />
            <input
              onChange={(e) => {
                setRecoveryEmail(e.target.value);
              }}
              style={{ paddingLeft: 10, paddingRight: 10 }}
              type="email"
              placeholder="enter email"
            />
            <button
              disabled={!recoveryEmail}
              onClick={getCode}
              style={{ paddingLeft: 10, paddingRight: 10, marginTop: 30 }}
            >
              {loading2 ? (
                <span
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  sending
                  <CircularProgress
                    style={{ marginLeft: 5 }}
                    color="white"
                    size={15}
                  />
                </span>
              ) : (
                "Get Code"
              )}
            </button>
            <br />
            {!recoveryEmail
              ? ""
              : "A 6 digit code will be sent to the email address above."}
            <br />
            <br />
            <input
              disabled={!recoveryEmail}
              onChange={(e) => {
                setVerificationCode(e.target.value);
              }}
              style={{ paddingLeft: 10, paddingRight: 10 }}
              type="text"
              placeholder="enter the 6 digit code"
            />
            <button
              disabled={!recoveryEmail}
              onClick={verifyCode}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              {loading3 ? (
                <span
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Verifying
                  <CircularProgress
                    style={{ marginLeft: 5 }}
                    color="white"
                    size={15}
                  />
                </span>
              ) : (
                "Verify Code"
              )}
            </button>
          </div>

          {/* Change password */}
          <div
            className="w3-card"
            style={{
              borderRadius: 20,
              marginBottom: 10,
              padding: 10,
              width: "100%",
              height: 300,
              textAlign: "center",
              margin: 10,
              width: 300,
            }}
          >
            <h3>change password</h3>
            <input
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              type="password"
              style={{ padding: 4 }}
              placeholder="enter old password"
            />
            <br />
            <br />
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              style={{ padding: 4 }}
              placeholder="enter new password"
              disabled={!oldPassword}
            />
            <br />
            <br />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              style={{
                padding: 4,
                borderColor: password !== newPassword ? "crimson" : "",
                color: password !== newPassword ? "crimson" : "",
              }}
              placeholder="comfirm new password"
              disabled={!newPassword}
            />
            <br />
            {password !== newPassword ? (
              <span style={{ color: "crimson" }}>password does`nt match!</span>
            ) : (
              ""
            )}
            <br />

            <button
              disabled={!password}
              onClick={updatePassword}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  changing...{" "}
                  <CircularProgress
                    style={{ marginLeft: 15 }}
                    color="white"
                    size={15}
                  />
                </span>
              ) : (
                "Change Password"
              )}
            </button>
          </div>

          {/* DELETE ACCOUNT */}
          <div
            className="w3-card"
            style={{
              borderRadius: 20,
              marginBottom: 10,
              padding: 10,
              width: "100%",
              height: 330,
              textAlign: "center",
              margin: 10,
              width: 330,
            }}
          >
            <h3 style={{ color: "crimson" }}>Delete Account 💀</h3>
            <p style={{ color: "maroon" }}>
              Deleting your account will erase all the information about you and
              all your records from the database, continue with caution!
            </p>
            <br />
            <br />
            <input
              style={{ paddingLeft: 10, paddingRight: 10 }}
              type="password"
              placeholder="enter password to continue"
            />
            <br />
            <br />
            <button
              onClick={deleteAccount}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "crimson",
                color: "white",
                borderRadius: 6,
                border: "none",
              }}
              disabled={true}
            >
              {loading4 ? (
                <span
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  deleting
                  <CircularProgress
                    style={{ marginLeft: 5 }}
                    color="white"
                    size={15}
                  />
                </span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE */}
      <div style={{ display: "flex" }}>
        <div>
          {" "}
          <h2 style={{ color: "lightgrey" }}>Account</h2>
          <label>names</label>
          <br />
          <input
            onChange={(e) => {
              setNames(e.target.value);
            }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            disabled={true}
            type="email"
          />{" "}
          <br />
          <br />
          <label>Contact</label>
          <br />
          <input
            onChange={(e) => {
              setContact(e.target.value);
            }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            disabled={true}
            type="email"
          />{" "}
          <br />
          <br />
          <label>email</label>
          <br />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            disabled={true}
            type="email"
          />{" "}
          <br />
          <br />
          <label>Recovery Email</label>
          <br />
          <input
            onChange={(e) => {
              setRecoveryEmail(e.target.value);
            }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            disabled={true}
            type="email"
          />{" "}
          <br />
          <br />
          <button
            onClick={updateProfile}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            Update
          </button>
        </div>
      </div>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "lightgrey", flex: 1 }}>Terms & Conditions</h2>
        <button style={{ paddingLeft: 10, paddingRight: 10 }}>Edit</button>
      </span>
      <div style={{ width: "100%", height: 400 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
        repudiandae minima quos quasi sit omnis ad repellat alias, porro ducimus
        sapiente cupiditate pariatur architecto nisi eos excepturi harum illum
        voluptate. Quae consequatur nemo libero eligendi corrupti voluptates quo
        molestiae quaerat perferendis eos dolorem omnis inventore itaque facere
        sint repellendus at, nobis vitae voluptate, ipsa placeat deserunt illo
        delectus quidem. Obcaecati. Nulla neque culpa praesentium accusantium
        cum, in perferendis molestiae fuga. Alias enim nisi dolore omnis
        suscipit voluptas earum, magni architecto et maiores praesentium sint
        autem reiciendis odit voluptatum numquam minus. Sint odio officia
        voluptate fugiat aliquam minima hic perferendis quas sunt nobis
        obcaecati ut tenetur in deleniti inventore est dicta iste maiores quis,
        voluptatem cumque. Cupiditate ut iure vero rem! Laboriosam tempora
        mollitia itaque. Accusamus deserunt enim at animi, quia iusto officia.
        Placeat veritatis quas quaerat vero nisi, accusamus id, obcaecati fugit
        reprehenderit dolor quisquam aliquid veniam. Tempora, repudiandae ullam?
        Beatae quia aliquam voluptates explicabo ut hic? Quos explicabo tempore,
        velit repudiandae molestiae sequi maxime culpa quas officia
        necessitatibus assumenda et, accusantium adipisci eligendi ratione
        perspiciatis molestias earum quisquam numquam? Laudantium eaque aut
        repudiandae laborum, explicabo eos, asperiores accusamus inventore quae
        recusandae illum, amet architecto iste! Voluptatem sint quisquam neque
        et qui doloremque excepturi consequatur corrupti. Optio quidem maxime
        incidunt! Vitae veniam facilis qui autem ad reprehenderit maxime magnam
        et illo. Reprehenderit nobis repudiandae blanditiis velit accusamus, aut
        non vitae quibusdam beatae, ipsa eius? Ad, dolores. Voluptate sint
        necessitatibus quo! Aliquid, eius dolor natus, tempora, dolore earum
        perferendis nostrum consequuntur ab quis repellat. Et natus quae sequi
        incidunt fugiat ad, eaque nesciunt rem odit doloremque debitis
        voluptatem dignissimos possimus cumque. Sed consequuntur totam corrupti
        molestias dolores, repellendus ipsam animi non commodi natus ad quo eum
        iste quam cumque odio eligendi? Laboriosam sint eum inventore dolor
        numquam iusto, ad atque rem?
      </div>
    </div>
  );
}

export default SettingsPage;
