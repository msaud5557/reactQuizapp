import React, { useState, useEffect } from "react";
import './app.css';

const quizData = {
  Programming: {
    Java: [
{ question: "What is Java?", options: ["Language", "Animal", "Place"], answer: "Language" },

      { question: "What is JVM?", options: ["Machine", "Environment", "Code"], answer: "Environment" },
    ],
    Python: [

{ question: "Who created Python?", options: ["Guido", "Dennis", "Linus"], answer: "Guido" },

         { question: "Is Python dynamically typed?", options: ["Yes", "No"], answer: "Yes" },
    ],
  },
  Technology: {
    AI: [
 { question: "AI stand for?", options: ["Artificial Intelligence", "Animal Instinct", "Automated Insight","Automated Intelligence"], answer: "Artificial Intelligence" },
     
 { question: "AI is part of?", options: ["Physics", "Computer Science", "Chemistry","Biology"], answer: "Computer Science" },
    ],
  },
  GeneralKnowledge: {
    History: [
      { question: "Who was the first President of the US?", options: ["George Washington", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
    ],
  }
};

function App() {
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleOptionClick = (op) => {
    if (op === quizData[category][subCategory][currQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currQuestion + 1;
    if (nextQuestion < quizData[category][subCategory].length) {
      setCurrQuestion(nextQuestion);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const handleCategorySelect = (e) => {
    setCategory(e);
    setSubCategory(null); 
    setQuizStarted(false);
  };

  const handleSubCategorySelect = (e) => {
    setSubCategory(e);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  useEffect(() => {
    if (quizStarted) {
      if (timer === 0) {
        const nextQuestion = currQuestion + 1;
        if (nextQuestion < quizData[category][subCategory].length) {
          setCurrQuestion(nextQuestion);
          setTimer(10);
        } else {
          setShowScore(true);
        }
      } else {
        const countdown = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(countdown);
      }
    }
  }, [timer, quizStarted, currQuestion, category, subCategory]);

  return (
    <div className="App">
      <header className="header">
        <h1>Quiz Application</h1>
      </header>

      <div className="dropdowns">
        <h2>Select Category</h2>
        <div className="dropdown">
          <button onClick={() => handleCategorySelect("Programming")}>Programming</button>
          <button onClick={() => handleCategorySelect("Technology")}>Technology</button>
          <button onClick={() => handleCategorySelect("GeneralKnowledge")}>General Knowledge</button>
        </div>
      </div>

      {category && (
        <div className="subCategory">
          <h3>Select Sub-Category:</h3>
          {category === "Programming" && (
            <div>
              <button onClick={() => handleSubCategorySelect("Java")}>Java</button>
              <button onClick={() => handleSubCategorySelect("Python")}>Python</button>
              </div>
          )}
          {category === "Technology" && (
            <div>
              <button onClick={() => handleSubCategorySelect("AI")}>AI</button>
              </div>
          )}
          {category === "GeneralKnowledge" && (
            <div>
              <button onClick={() => handleSubCategorySelect("History")}>History</button>
              </div>
          )}
        </div>
      )}

      {subCategory && (
        <div className="startQuiz">
          <h3>{subCategory} Quiz</h3>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}

      {quizStarted && (
        <div className="quiz">
          {showScore ? (
            <h3>Your Score: {score}</h3>
          ) : (
            <>
              <h2>{subCategory} Quiz</h2>
              <h3>{quizData[category][subCategory][currQuestion].question}</h3>
              <div className="options">
                {quizData[category][subCategory][currQuestion].options.map((op, i) => (
                  <button key={i} onClick={() => handleOptionClick(op)}>
                    {op}
                  </button>
                ))}
              </div>
              <div className="timer">Time left: {timer} seconds</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
