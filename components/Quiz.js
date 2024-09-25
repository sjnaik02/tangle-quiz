// File: components/Quiz.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import ResultMessage from "./ResultMessage";

const Quiz = ({ questions }) => {
  const { title, subtitle, questions: quizQuestions } = questions;

  const [answers, setAnswers] = useState(
    new Array(quizQuestions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    if (newAnswers.every((a) => a !== null)) {
      setAllAnswered(true);
    }
  };

  useEffect(() => {
    if (allAnswered) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer);
    }
  }, [allAnswered]);

  const score = answers.reduce(
    (acc, answer, index) =>
      answer === quizQuestions[index].correct ? acc + 1 : acc,
    0
  );

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 sm:mb-6 font-bold md:mb-8 mt-8 sm:mt-12 md:mt-16 md:text-center text-left break-words max-w-4xl mx-auto"
      >
        {title || "Tangle News Quiz"}
      </motion.h1>
      <h2 className="text-lg sm:text-xl md:text-2xl mb-4 md:text-center text-left text-gray-700 max-w-3xl mx-auto font-serif px-2">
        {subtitle ||
          "Politics is complicated. How well do you understand the news?"}
      </h2>
      <div className="mx-auto w-full max-w-2xl flex-grow">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              {quizQuestions.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  index={index}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[index]}
                />
              ))}
              {allAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xl font-bold text-gray-700 mt-4"
                >
                  Calculating your results...
                </motion.div>
              )}
            </motion.div>
          ) : (
            <ResultMessage score={score} total={quizQuestions.length} />
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-gray-600 mt-8"
        ></motion.div>
      </div>
    </div>
  );
};

export default Quiz;