import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link to="/">CyberSecurity Hub</Link>
      </div>
      <ul className={styles.navbarLinks}>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        {token && (
          <>
            <li>
              <Link to="/quizzes">Quizzes</Link>
            </li>
            <li>
              <Link to="/submit-report">Submit Report</Link>
            </li>
            <li>
              <Link to="/my-reports">View My Reports</Link>
            </li>
            <li>
              <Link to="/change-password">Change Password</Link>
            </li>
          </>
        )}
        {token ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
