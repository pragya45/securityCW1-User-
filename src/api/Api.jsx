import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Register a new user
export const registerApi = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login a user
export const loginApi = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Fetch articles (protected route)
export const fetchArticles = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // No headers if not logged in

    const response = await axios.get(`${API_BASE_URL}/api/articles`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// Like an article
export const likeArticleApi = async (articleId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/articles/${articleId}/like`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error liking article:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Save an article
export const saveArticleApi = async (articleId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/articles/${articleId}/save`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error saving article:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchLikedArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/articles/liked`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked articles", error);
    throw error;
  }
};

export const fetchSavedArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/articles/saved`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching saved articles", error);
    throw error;
  }
};

// Fetch all quizzes
export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/quizzes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// Fetch a quiz by ID
export const fetchQuizById = async (quizId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

// Submit quiz answers
export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/quizzes/${quizId}/submit`,
      { answers },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};

// Create a new report
export const createReportApi = async (reportData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/reports`,
      reportData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

// Fetch user's reports
export const fetchUserReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reports`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Change password
export const changePasswordApi = async (passwordData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/users/change-password`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
