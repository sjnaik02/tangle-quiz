"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import Link from "next/link";

const ScoreQuiz = ({ questions }) => {
  const {
    title,
    subtitle,
    questions: quizQuestions,
    customCopy,
    customCTA,
    customCTALink,
  } = questions;

  const [answers, setAnswers] = useState(
    new Array(quizQuestions.length).fill(null),
  );
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef(null);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    if (newAnswers.every((a) => a !== null)) {
      setShowResult(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const scores = answers.reduce(
    (acc, answer, index) => {
      if (answer === "a") {
        const question = quizQuestions[index];
        acc.left += parseInt(question.left);
        acc.center += parseInt(question.center);
        acc.right += parseInt(question.right);
        acc.total += 1;
      }
      return acc;
    },
    { left: 0, center: 0, right: 0, total: 0 },
  );

  return (
    <div className="flex min-h-screen flex-col px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-4 mt-8 max-w-4xl break-words text-left text-3xl font-bold sm:mb-6 sm:mt-12 sm:text-4xl md:mb-8 md:mt-16 md:text-center md:text-5xl lg:text-6xl"
      >
        {title || "News Bubble Quiz"}
      </motion.h1>
      <h2 className="mx-auto mb-4 max-w-3xl px-2 text-left font-serif text-base text-gray-700 sm:text-lg md:text-center md:text-xl">
        {subtitle || "Are you in a news bubble? Let's find out!"}
      </h2>
      <div className="mx-auto w-full max-w-2xl flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {quizQuestions.map((question, index) => (
            <ScoreQuestionCard
              key={index}
              question={question}
              index={index}
              onAnswer={handleAnswer}
              selectedAnswer={answers[index]}
            />
          ))}
        </motion.div>
        <AnimatePresence>
          {showResult && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 mt-12"
            >
              <BubbleResultsViz
                answers={answers}
                questions={quizQuestions}
                customCopy={customCopy}
                customCTA={customCTA}
                customCTALink={customCTALink}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-auto py-8 text-center text-gray-600">
        <Link
          href="https://readtangle.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-indigo-600"
        >
          © {new Date().getFullYear()} Tangle News. All rights reserved.
        </Link>
      </footer>
    </div>
  );
};

export default ScoreQuiz;
const ScoreQuestionCard = ({ question, index, onAnswer, selectedAnswer }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="mb-8 border-t border-gray-300 bg-white py-6"
  >
    <h3 className="mb-2 text-sm md:text-base">Question {index + 1}</h3>
    <p className="mb-6 text-lg">{question.question}</p>
    <div className="space-y-3 md:space-y-4">
      {Object.entries(question.answers).map(([key, value]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex w-full items-center justify-between rounded-md p-4 text-left transition-all duration-200 ${
            selectedAnswer === key
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-50 text-gray-800 hover:bg-gray-100"
          } border border-gray-200 text-base md:text-lg`}
          onClick={() => onAnswer(index, key)}
        >
          <span>{value}</span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const BubbleResultsViz = ({
  answers,
  questions,
  customCopy,
  customCTA,
  customCTALink,
}) => {
  // Calculate scores for each category
  const scores = answers.reduce(
    (acc, answer, index) => {
      if (answer === "a") {
        // If they saw the story
        acc.left += parseInt(questions[index].left) || 0;
        acc.center += parseInt(questions[index].center) || 0;
        acc.right += parseInt(questions[index].right) || 0;
        acc.total++;
      }
      return acc;
    },
    { left: 0, center: 0, right: 0, total: 0 },
  );

  // Convert to percentages
  const leftPct = Math.round((scores.left / (scores.total * 100)) * 100) || 0;
  const centerPct =
    Math.round((scores.center / (scores.total * 100)) * 100) || 0;
  const rightPct = Math.round((scores.right / (scores.total * 100)) * 100) || 0;

  // Determine primary bubble
  const max = Math.max(leftPct, centerPct, rightPct);
  let primaryBubble = "center";
  if (max === leftPct) primaryBubble = "left";
  if (max === rightPct) primaryBubble = "right";

  const [showFinal, setShowFinal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFinal(true);
      setIsAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-2xl font-bold">Your News Bubble</h3>

      <div className="space-y-8">
        <div className="flex justify-between px-4 font-semibold">
          <span className="text-blue-600">Left-Leaning</span>
          <span className="text-gray-600">Center</span>
          <span className="text-red-600">Right-Leaning</span>
        </div>

        <div className="flex h-32 items-stretch overflow-hidden rounded-lg shadow-md">
          <motion.div
            className="relative flex items-center justify-center bg-blue-500/80"
            initial={{ flex: 1 }}
            animate={{
              flex: isAnimating ? [0.5, 2, 1, 1.5, 1] : leftPct,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8],
              repeat: isAnimating ? Infinity : 0,
            }}
          >
            <motion.span
              className="absolute text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: showFinal ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              {showFinal && `${leftPct}%`}
            </motion.span>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center bg-gray-500/80"
            initial={{ flex: 1 }}
            animate={{
              flex: isAnimating ? [1.5, 1, 2, 0.5, 1] : centerPct,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8],
              repeat: isAnimating ? Infinity : 0,
            }}
          >
            <motion.span
              className="absolute text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: showFinal ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              {showFinal && `${centerPct}%`}
            </motion.span>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center bg-red-500/80"
            initial={{ flex: 1 }}
            animate={{
              flex: isAnimating ? [1, 0.5, 1.5, 2, 1] : rightPct,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8],
              repeat: isAnimating ? Infinity : 0,
            }}
          >
            <motion.span
              className="absolute text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: showFinal ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              {showFinal && `${rightPct}%`}
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showFinal ? 1 : 0, y: showFinal ? 0 : 20 }}
          transition={{ delay: 0.5 }}
        >
          <p className="mb-6 text-lg">
            {customCopy?.[primaryBubble] ||
              (primaryBubble === "center"
                ? "You appear to have a balanced news diet! You're seeing stories from across the political spectrum."
                : primaryBubble === "left"
                  ? "Your news sources tend to lean left. Consider diversifying with some center and right-leaning sources."
                  : "Your news sources tend to lean right. Consider diversifying with some center and left-leaning sources.")}
          </p>

          {customCTA && customCTALink && (
            <Link
              href={customCTALink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {customCTA}
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};
