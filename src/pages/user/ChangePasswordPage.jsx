import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ChangePasswordPage.module.css";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const navigate = useNavigate();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const validatePassword = (password) => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return strongPasswordPattern.test(password);
  };

  const handleNewPasswordChange = (e) => {
    const pwd = e.target.value;
    setNewPassword(pwd);

    if (validatePassword(pwd)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwordStrength !== "Strong") {
      toast.error("Please choose a stronger password.");
      return;
    }

    try {
      // API call to change password
      await axios.put(
        "http://localhost:5000/api/users/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Password changed successfully!");
      navigate("/dashboard");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "Cannot reuse recent passwords. Please choose a new password."
      ) {
        toast.error(
          "Cannot reuse recent passwords. Please choose a new password."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Password change failed, please try again."
        );
      }
    }
  };

  return (
    <div className={styles.changePasswordContainer}>
      <div className={styles.changePasswordBox}>
        <h2 className={styles.heading}>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Current Password:</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span
                onClick={toggleCurrentPasswordVisibility}
                className={styles.eyeIcon}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>New Password:</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              <span
                onClick={toggleNewPasswordVisibility}
                className={styles.eyeIcon}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <p
              className={
                passwordStrength === "Strong"
                  ? styles.strongPassword
                  : styles.weakPassword
              }
            >
              Password Strength: {passwordStrength}
            </p>
          </div>
          <div className={styles.formGroup}>
            <label>Confirm New Password:</label>
            <div className={styles.passwordWrapper}>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={passwordStrength !== "Strong"}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
