import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username to contain only letters
    if (!/^[A-Za-z]+$/.test(username)) {
      toast.error(
        "Username must contain only letters (no numbers or special characters)."
      );
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Ensure password is strong
    if (passwordStrength !== "Strong") {
      toast.error("Please choose a stronger password.");
      return;
    }

    try {
      // Registration API call
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      });

      // Show success message and redirect to login
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed, please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return strongPasswordPattern.test(password);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (validatePassword(pwd)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2 className={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className={styles.eyeIcon}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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
            <label>Confirm Password:</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className={styles.eyeIcon}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={passwordStrength !== "Strong"}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
