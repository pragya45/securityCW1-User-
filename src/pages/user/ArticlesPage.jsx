import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchArticles, likeArticleApi, saveArticleApi } from "../../api/Api";
import styles from "./ArticlesPage.module.css";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      }
    };

    getArticles();
  }, []);

  const handleLike = async (articleId) => {
    if (!token) {
      toast.info("Please log in or create an account to like articles.", {
        onClose: () => navigate("/login"),
      });
      return;
    }

    try {
      await likeArticleApi(articleId);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? { ...article, liked: !article.liked }
            : article
        )
      );
      toast.success("Article liked successfully!");
    } catch (error) {
      console.error("Failed to like article", error);
      toast.error("Failed to like article.");
    }
  };

  const handleSave = async (articleId) => {
    if (!token) {
      toast.info("Please log in or create an account to save articles.", {
        onClose: () => navigate("/login"),
      });
      return;
    }

    try {
      await saveArticleApi(articleId);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? { ...article, saved: !article.saved }
            : article
        )
      );
      toast.success("Article saved successfully!");
    } catch (error) {
      console.error("Failed to save article", error);
      toast.error("Failed to save article.");
    }
  };

  return (
    <div className={styles.articlesContainer}>
      <ToastContainer />
      {/* <h2 className={styles.heading}>Articles</h2> */}
      <ul className={styles.articleList}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article._id} className={styles.articleItem}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleContent}>{article.content}</p>
              <div className={styles.articleActions}>
                <button
                  onClick={() => handleLike(article._id)}
                  className={`${styles.actionButton} ${
                    article.liked ? styles.liked : ""
                  }`}
                >
                  {article.liked ? "Unlike" : "Like"}
                </button>
                <button
                  onClick={() => handleSave(article._id)}
                  className={`${styles.actionButton} ${
                    article.saved ? styles.saved : ""
                  }`}
                >
                  {article.saved ? "Unsave" : "Save"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </ul>
    </div>
  );
};

export default ArticlesPage;
