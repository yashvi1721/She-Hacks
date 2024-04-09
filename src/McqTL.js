// src/components/SexEdSprint.js
import React, { useState } from 'react';

const SexEdSprint = () => {
  const questions = [
    {
      question: "What is the most effective method of contraception?",
      options: ["a) Condoms", "b) Birth control pills"],
      answer: "a"
    },
    {
      question: "What is the average age when puberty begins in boys?",
      options: ["a) 10-12 years", "b) 13-15 years"],
      answer: "a"
    },
    {
      question: "Which of the following is a symptom of a sexually transmitted infection (STI)?",
      options: ["a) Fever", "b) Genital itching or burning"],
      answer: "b"
    },
    {
      question: "What is a healthy way to communicate consent in a sexual encounter?",
      options: ["a) Non-verbal cues", "b) Explicit verbal agreement"],
      answer: "b"
    },
    {
      question: "True or False: Masturbation is a normal and healthy part of human sexuality.",
      options: ["a) True", "b) False"],
      answer: "a"
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      checkAnswer();
      setSelectedOption('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000); // 1 second delay before moving to the next question
  };

  const checkAnswer = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      {currentQuestionIndex < questions.length ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{questions[currentQuestionIndex].question}</h1>
          <div className="space-y-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`block w-full py-2 px-4 rounded-md text-white font-semibold ${
                  selectedOption === option[0].toLowerCase() ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-500'
                }`}
                onClick={() => handleOptionSelect(option[0].toLowerCase())}
                disabled={selectedOption !== ''}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Game Over!</h1>
          <p className="text-xl">Your final score: {score}/{questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default SexEdSprint;
