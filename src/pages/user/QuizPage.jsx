import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchQuizzes } from "../../api/Api";
import styles from "./QuizPage.module.css";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      }
    };
    getQuizzes();
  }, []);

  const handleQuizSelect = (quizId) => {
    if (!token) {
      toast.info("Please log in or create an account to take quizzes.", {
        onClose: () => navigate("/login"),
      });
      return;
    }
    navigate(`/quizzes/${quizId}`);
  };

  return (
    <div className={styles.quizContainer}>
      <ToastContainer />
      <ul className={styles.quizList}>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className={styles.quizItem}>
            <h3 className={styles.quizTitle}>{quiz.title}</h3>
            <button
              className={styles.takeQuizButton}
              onClick={() => handleQuizSelect(quiz._id)}
            >
              Take Quiz
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizPage;
