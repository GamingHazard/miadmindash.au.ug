import React, { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Configs } from "../components/Configs";

export const AuthContext = createContext();
// const navigate = useNavigate();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [adminProfile, setAdminProfile] = useState("");
  const [adminID, setAdminID] = useState("");

  // Encrypt function (for storing the data)
  const EncryptData = (data) => {
    return CryptoJS.AES.encrypt(data?.trim(), Configs.SECRET_KEY).toString();
  };

  // Decrypt function (for retrieving the data)
  const DecryptData = (cipherText) => {
    if (!cipherText) {
      // console.error("No cipherText provided for decryption");
      return null; // Return a fallback value or handle appropriately
    }
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, Configs.SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData || null; // Handle empty decrypted strings
    } catch (error) {
      // console.error("Decryption failed:", error);
      return null; // Return null in case of failure
    }
  };

  const loggedIn = () => {
    const savedToken = localStorage.getItem("token");
    const newToken = DecryptData(savedToken);

    if (savedToken) {
      setToken(newToken);
    }
  };

  useEffect(() => {
    loggedIn();
  }, []);

  // admin Register function
  const register = async (token, id, profile) => {
    if (token) {
      setToken(token);
    }
    setAdminProfile(profile);
    setAdminID(id);
    let safeData = EncryptData(JSON.stringify(profile));
    localStorage.setItem("token", EncryptData(token));
    localStorage.setItem("profile", safeData);
    localStorage.setItem("adminID", EncryptData(id));
  };
  //  admin login funtion
  const login = async (token, id, profile) => {
    try {
      if (token) {
        setToken(token);
        setAdminProfile(profile);
        setAdminID(id);
        let safeData = EncryptData(JSON.stringify(profile));
        localStorage.setItem("token", EncryptData(token));
        localStorage.setItem("profile", safeData);
        localStorage.setItem("adminID", EncryptData(id));
      }
    } catch (error) {
      alert(message, "failed to login");
      console.log(error);
    }
  };

  const logout = () => {
    setAdminID("");
    setToken("");
    setAdminProfile("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        register,
        logout,
        EncryptData,
        DecryptData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
