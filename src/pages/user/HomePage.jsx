import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { FaCog, FaTasks, FaUser } from "react-icons/fa";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Typography variant="subtitle1" className={styles.subtitle}>
        Welcome to your dashboard! Here you can manage your account, view your
        activities, and more.
      </Typography>
      <Grid container spacing={4} className={styles.gridContainer}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={styles.card}>
            <CardContent>
              <FaUser className={styles.icon} />
              <Typography variant="h6" className={styles.cardTitle}>
                Account Settings
              </Typography>
              <Typography variant="body2" className={styles.cardDescription}>
                Update your profile, change your password, and manage account
                settings.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={styles.cardButton}
              >
                Manage Account
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={styles.card}>
            <CardContent>
              <FaTasks className={styles.icon} />
              <Typography variant="h6" className={styles.cardTitle}>
                Your Activities
              </Typography>
              <Typography variant="body2" className={styles.cardDescription}>
                Track your recent activities, view history, and manage tasks.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={styles.cardButton}
              >
                View Activities
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={styles.card}>
            <CardContent>
              <FaCog className={styles.icon} />
              <Typography variant="h6" className={styles.cardTitle}>
                Settings
              </Typography>
              <Typography variant="body2" className={styles.cardDescription}>
                Customize your preferences, notifications, and more.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={styles.cardButton}
              >
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
