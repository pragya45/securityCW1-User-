import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchUserReports } from "../../api/Api";
import styles from "./UserReports.module.css"; // Importing the updated CSS module

const UserReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchUserReports();
        setReports(data);
      } catch (error) {
        toast.error("Failed to fetch reports");
      }
    };

    getReports();
  }, []);

  return (
    <div className={styles.reportsContainer}>
      <h2 className={styles.title}>Your Reports</h2>
      {reports.length > 0 ? (
        <div className={styles.reportsGrid}>
          {reports.map((report) => (
            <div key={report._id} className={styles.reportCard}>
              <h3 className={styles.reportTitle}>{report.title}</h3>
              <p className={styles.reportDescription}>{report.description}</p>
              <p className={styles.reportStatus}>Status: {report.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noReports}>No reports found.</p>
      )}
    </div>
  );
};

export default UserReports;
