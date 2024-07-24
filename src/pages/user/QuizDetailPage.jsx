// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { fetchQuizById, submitQuiz } from '../../api/Api';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './QuizDetailPage.module.css'; // Assuming you have a CSS module for styling

// const QuizDetailPage = () => {
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const getQuiz = async () => {
//       try {
//         const data = await fetchQuizById(quizId);
//         setQuiz(data);
//         setAnswers(new Array(data.questions.length).fill(null)); // Initialize answers with null
//       } catch (error) {
//         toast.error('Failed to fetch quiz');
//       }
//     };

//     getQuiz();
//   }, [quizId]);

//   const handleAnswerChange = (questionIndex, optionIndex) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[questionIndex] = {
//       questionId: quiz.questions[questionIndex]._id,
//       answer: optionIndex,
//     };
//     setAnswers(updatedAnswers);
//   };

//   const handleSubmitQuiz = async () => {
//     if (answers.some((answer) => answer === null)) {
//       toast.error('Please answer all questions before submitting!');
//       return;
//     }

//     console.log('Answers submitted: ', answers); // Debugging log

//     try {
//       const resultData = await submitQuiz(quizId, { answers });
//       console.log('Quiz result: ', resultData); // Debugging log
//       setResult(resultData);
//       toast.success('Quiz submitted successfully!');
//     } catch (error) {
//       console.error('Quiz submission error: ', error); // Debugging log
//       toast.error('Failed to submit quiz');
//     }
//   };

//   if (!quiz) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.quizDetailContainer}>
//       <h2 className={styles.quizTitle}>{quiz.title}</h2>
//       {quiz.questions.map((question, index) => (
//         <div key={question._id} className={styles.questionContainer}>
//           <p className={styles.questionText}>{question.questionText}</p>
//           <ul className={styles.optionsList}>
//             {question.options.map((option, i) => (
//               <li key={i} className={styles.optionItem}>
//                 <label className={styles.optionLabel}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={i}
//                     onChange={() => handleAnswerChange(index, i)}
//                     checked={answers[index]?.answer === i}
//                     disabled={!!result} // Disable inputs after quiz is submitted
//                     className={styles.optionInput}
//                   />
//                   {option.optionText}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           {result && (
//             <p className={styles.resultText}>
//               Your answer is{' '}
//               {result.results[index].isCorrect ? (
//                 <span className={styles.correctText}>Correct</span>
//               ) : (
//                 <span className={styles.incorrectText}>Incorrect</span>
//               )}
//             </p>
//           )}
//         </div>
//       ))}
//       {!result && (
//         <button className={styles.submitButton} onClick={handleSubmitQuiz}>
//           Submit Quiz
//         </button>
//       )}
//       {result && (
//         <div className={styles.resultContainer}>
//           <h3 className={styles.resultTitle}>Quiz Result</h3>
//           <p className={styles.resultScore}>
//             You scored {result.score} out of {result.totalQuestions}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizDetailPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchQuizById, submitQuiz } from "../../api/Api";
import styles from "./QuizDetailPage.module.css"; // Importing the CSS module

const QuizDetailPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const data = await fetchQuizById(quizId);
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null)); // Initialize answers with null
      } catch (error) {
        toast.error("Failed to fetch quiz");
      }
    };

    getQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      questionId: quiz.questions[questionIndex]._id,
      answer: optionIndex,
    };
    setAnswers(updatedAnswers);
    console.log("Updated Answers: ", updatedAnswers); // Debugging log
  };

  const handleSubmitQuiz = async () => {
    console.log("Answers submitted: ", answers); // Check that answers are being captured correctly

    try {
        const resultData = await submitQuiz(quizId, { answers });
        console.log("Quiz result: ", resultData); // Check result data returned from the server
        setResult(resultData);
        toast.success("Quiz submitted successfully!");
    } catch (error) {
        console.error("Quiz submission error: ", error); // Debugging log to check errors
        toast.error("Failed to submit quiz");
    }
};


  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.quizDetailContainer}>
      <h2 className={styles.quizTitle}>{quiz.title}</h2>
      {quiz.questions.map((question, index) => (
        <div key={question._id} className={styles.questionContainer}>
          <p className={styles.questionText}>{question.questionText}</p>
          <ul className={styles.optionsList}>
            {question.options.map((option, i) => (
              <li key={i} className={styles.optionItem}>
                <label className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={i}
                    onChange={() => handleAnswerChange(index, i)}
                    checked={answers[index]?.answer === i}
                    disabled={!!result} // Disable inputs after quiz is submitted
                    className={styles.optionInput}
                  />
                  {option.optionText}
                </label>
              </li>
            ))}
          </ul>
          {result && (
            <p className={styles.resultText}>
              Your answer is{" "}
              {result.results[index].isCorrect ? (
                <span className={styles.correctText}>Correct</span>
              ) : (
                <span className={styles.incorrectText}>Incorrect</span>
              )}
            </p>
          )}
        </div>
      ))}
      {!result && (
        <button className={styles.submitButton} onClick={handleSubmitQuiz}>
          Submit Quiz
        </button>
      )}
      {result && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>Quiz Result</h3>
          <p className={styles.resultScore}>
            You scored {result.score} out of {result.totalQuestions}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizDetailPage;
