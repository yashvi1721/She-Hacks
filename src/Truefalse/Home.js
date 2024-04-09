// App.js
import React, { useState } from "react";
import questionsData from "./Question";


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {showScore ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Score: {score}</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={resetQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {questionsData[currentQuestion].question}
          </h1>
          <div>
            <button
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => handleAnswerOptionClick(questionsData[currentQuestion].options[0].isCorrect)}
            >
              True
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => handleAnswerOptionClick(questionsData[currentQuestion].options[1].isCorrect)}
            >
              False
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
