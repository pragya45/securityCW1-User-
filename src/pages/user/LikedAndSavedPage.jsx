import React, { useEffect, useState } from "react";
import { fetchLikedArticles, fetchSavedArticles, likeArticleApi, saveArticleApi } from "../../api/Api";
import styles from "./LikedAndSavedPage.module.css";

const LikedAndSavedPage = () => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const getLikedArticles = async () => {
      try {
        const data = await fetchLikedArticles();
        setLikedArticles(data);
      } catch (error) {
        console.error("Failed to fetch liked articles", error);
      }
    };

    const getSavedArticles = async () => {
      try {
        const data = await fetchSavedArticles();
        setSavedArticles(data);
      } catch (error) {
        console.error("Failed to fetch saved articles", error);
      }
    };

    getLikedArticles();
    getSavedArticles();
  }, []);

  const handleLikeToggle = async (articleId) => {
    try {
      await likeArticleApi(articleId);
      setLikedArticles(prev => prev.filter(article => article._id !== articleId));
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const handleSaveToggle = async (articleId) => {
    try {
      await saveArticleApi(articleId);
      setSavedArticles(prev => prev.filter(article => article._id !== articleId));
    } catch (error) {
      console.error("Failed to toggle save", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Liked Articles</h2>
      <ul className={styles.articleList}>
        {likedArticles.length > 0 ? (
          likedArticles.map((article) => (
            <li key={article._id} className={styles.articleItem}>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
              <button onClick={() => handleLikeToggle(article._id)}>Unlike</button>
            </li>
          ))
        ) : (
          <p>No liked articles found.</p>
        )}
      </ul>

      <h2>Saved Articles</h2>
      <ul className={styles.articleList}>
        {savedArticles.length > 0 ? (
          savedArticles.map((article) => (
            <li key={article._id} className={styles.articleItem}>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
              <button onClick={() => handleSaveToggle(article._id)}>Unsave</button>
            </li>
          ))
        ) : (
          <p>No saved articles found.</p>
        )}
      </ul>
    </div>
  );
};

export default LikedAndSavedPage;
