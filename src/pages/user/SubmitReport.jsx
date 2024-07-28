// SubmitReport.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createReportApi } from "../../api/Api";
import styles from "./SubmitReport.module.css";
import "react-toastify/dist/ReactToastify.css";

const SubmitReport = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createReportApi({ title, description });
      toast.success("Report submitted successfully!");
      setTimeout(() => {
        navigate("/my-reports");
      }, 1500);
    } catch (error) {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className={styles.submitReportContainer}>
      <h2 className={styles.title}>Submit a New Report</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default SubmitReport;
