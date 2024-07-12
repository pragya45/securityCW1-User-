import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import Verify2FAPage from "./pages/auth/Verify2FAPage";
import ArticlesPage from "./pages/user/ArticlesPage";
import ChangePasswordPage from "./pages/user/ChangePasswordPage";
import DashboardPage from "./pages/user/DashboardPage";
import HomePage from "./pages/user/HomePage";
import LikedAndSavedPage from "./pages/user/LikedAndSavedPage";
import QuizDetailPage from "./pages/user/QuizDetailPage";
import QuizPage from "./pages/user/QuizPage";
import SubmitReport from "./pages/user/SubmitReport";
import UserReports from "./pages/user/UserReports";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/quizzes" element={<QuizPage />} />
        <Route path="/quizzes/:quizId" element={<QuizDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/submit-report" element={<SubmitReport />} />
        <Route path="/my-reports" element={<UserReports />} />
        <Route path="/liked-saved" element={<LikedAndSavedPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-2fa" element={<Verify2FAPage />} />
      </Routes>
    </Router>
  );
}

export default App;
