"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { toPng } from "html-to-image";
import { ClipboardIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
        className="mx-auto mb-4 mt-8 max-w-4xl break-words text-left text-2xl font-bold sm:mb-6 sm:mt-12 sm:text-3xl md:mb-8 md:mt-16 md:text-center md:text-4xl lg:text-5xl xl:text-6xl"
      >
        {title || "News Bubble Quiz"}
      </motion.h1>
      <h2 className="mx-auto mb-4 max-w-3xl px-2 text-left font-serif text-sm text-gray-700 sm:text-base md:text-center md:text-lg lg:text-xl">
        {subtitle || "Are you in a news bubble? Let's find out!"}
      </h2>
      <div className="mx-auto w-full max-w-2xl flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
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
              className="mb-8 mt-8 sm:mb-12 sm:mt-10 md:mb-16 md:mt-12"
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

      <footer className="mt-auto py-4 text-center text-sm text-gray-600 sm:py-6 md:py-8 md:text-base">
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
    className="mb-4 border-t border-gray-300 bg-white py-4 sm:mb-6 sm:py-5 md:mb-8 md:py-6"
  >
    <h3 className="mb-2 text-xs sm:text-sm md:text-base">
      Question {index + 1}
    </h3>
    <p className="mb-4 text-base sm:mb-5 sm:text-lg md:mb-6 md:text-xl">
      {question.question}
    </p>
    <div className="space-y-2 sm:space-y-3 md:space-y-4">
      {Object.entries(question.answers).map(([key, value]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex w-full items-center justify-between rounded-md p-3 text-left text-sm transition-all duration-200 sm:p-4 sm:text-base md:text-lg ${
            selectedAnswer === key
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-50 text-gray-800 hover:bg-gray-100"
          } border border-gray-200`}
          onClick={() => onAnswer(index, key)}
        >
          <span>{value}</span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

function calculateScores(answers, questions) {
  // Start with neutral prior
  let totalExposure = {
    left: 33.33,
    center: 33.33,
    right: 33.33,
  };

  let totalWeight = 100; // Starting weight for prior

  answers.forEach((answer, index) => {
    const question = questions[index];
    const scores = {
      left: parseInt(question.left),
      center: parseInt(question.center),
      right: parseInt(question.right),
    };

    if (answer === "a") {
      // For seen stories, add probability mass
      totalExposure.left += scores.left;
      totalExposure.center += scores.center;
      totalExposure.right += scores.right;
      totalWeight += 100;
    } else {
      // For unseen stories, small penalty to dominant perspective
      const maxScore = Math.max(scores.left, scores.center, scores.right);
      const penaltyWeight = 15; // Slightly reduced penalty given the prior

      if (scores.left === maxScore) {
        totalExposure.left -= penaltyWeight;
      }
      if (scores.center === maxScore) {
        totalExposure.center -= penaltyWeight;
      }
      if (scores.right === maxScore) {
        totalExposure.right -= penaltyWeight;
      }

      totalWeight += penaltyWeight;
    }
  });

  // Ensure no negative values
  totalExposure.left = Math.max(0, totalExposure.left);
  totalExposure.center = Math.max(0, totalExposure.center);
  totalExposure.right = Math.max(0, totalExposure.right);

  // Convert to percentages
  const total = totalExposure.left + totalExposure.center + totalExposure.right;

  return {
    leftPct: Math.round((totalExposure.left / total) * 100),
    centerPct: Math.round((totalExposure.center / total) * 100),
    rightPct: Math.round((totalExposure.right / total) * 100),
  };
}

const BubbleResultsViz = ({
  answers,
  questions,
  customCopy,
  customCTA,
  customCTALink,
}) => {
  const { leftPct, centerPct, rightPct, primaryBubble } = calculateScores(
    answers,
    questions,
  );

  const [showFinal, setShowFinal] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFinal(true);
      setShowColor(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = {
    left: "rgb(0, 0, 255)", // Democratic blue
    center: "rgb(128, 0, 128)", // Purple
    right: "rgb(255, 0, 0)", // Republican red
    empty: "rgb(229, 231, 235)", // Light gray
  };

  // Create array of 100 squares with assigned categories
  const squares = Array.from({ length: 100 }, (_, index) => {
    if (index < leftPct) return "left";
    if (index < leftPct + centerPct) return "center";
    return "right";
  });
  const copyGridToClipboard = async () => {
    if (!gridRef.current) return;

    try {
      const dataUrl = await toPng(gridRef.current);

      // Check if the browser supports the modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.write) {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const item = new ClipboardItem({
          "image/png": blob,
        });
        await navigator.clipboard.write([item]);
      } else {
        // Fallback for Safari - create temporary link and trigger download
        const link = document.createElement("a");
        link.download = "news-bubble-results.png";
        link.href = dataUrl;
        link.click();
      }

      toast.success("Image saved!");
    } catch (err) {
      console.error(err);
      toast.error("Could not save image. Try downloading instead.");
    }
  };

  const downloadGrid = async () => {
    const dataUrl = await toPng(gridRef.current);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "news-bubble-results.png";
    link.click();
    toast.success("Image saved!");
  };

  function getScoreMessage(leftPct, centerPct, rightPct) {
    const scores = [leftPct, centerPct, rightPct];
    const max = Math.max(...scores);
    const others = scores.filter((s) => s !== max);
    const avgOthers = others.reduce((a, b) => a + b, 0) / others.length;
    const spread = max - avgOthers;

    // Clear bubble case: over 50%
    if (max > 50) {
      if (leftPct === max) {
        return {
          title: "Left News Bubble",
          message:
            "You're predominantly seeing left-leaning coverage of events.",
          suggestion:
            "Try diversifying with some center and right-leaning sources like Reuters or The Wall Street Journal.",
        };
      }
      if (rightPct === max) {
        return {
          title: "Right News Bubble",
          message:
            "You're predominantly seeing right-leaning coverage of events.",
          suggestion:
            "Try diversifying with some center and left-leaning sources like Reuters or The Atlantic.",
        };
      }
      if (centerPct === max) {
        return {
          title: "Mainstream Bubble",
          message: "You're predominantly seeing mainstream coverage of events.",
          suggestion:
            "While mainstream sources are valuable, consider adding partisan perspectives to understand different viewpoints.",
        };
      }
    }

    // Strong lean case: 40-50% AND significant spread
    if (max > 40 && spread > 15) {
      if (leftPct === max) {
        return {
          title: "Left-Heavy Diet",
          message: "Your news diet leans significantly left.",
          suggestion:
            "Consider balancing with more center and right perspectives.",
        };
      }
      if (rightPct === max) {
        return {
          title: "Right-Heavy Diet",
          message: "Your news diet leans significantly right.",
          suggestion:
            "Consider balancing with more center and left perspectives.",
        };
      }
      if (centerPct === max) {
        return {
          title: "Center-Heavy Diet",
          message: "Your news diet is heavily centered on mainstream sources.",
          suggestion:
            "Consider adding some partisan perspectives for a fuller picture.",
        };
      }
    }

    // Slight lean case: noticeable spread but not dominant
    if (spread > 10) {
      return {
        title: "Slightly Imbalanced Diet",
        message: "Your news diet shows some imbalance, but isn't extreme.",
        suggestion: "You might benefit from adding more diverse sources.",
      };
    }

    // Balanced case
    return {
      title: "Balanced News Diet",
      message: "You're seeing a healthy mix of perspectives.",
      suggestion: "Keep up the diverse news consumption!",
    };
  }
  return (
    <Card className="mx-auto mt-4 w-full max-w-3xl bg-white p-4 sm:mt-6 sm:p-6 md:mt-8 md:p-8">
      <h3 className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl md:mb-6 md:text-3xl">
        Your News Bubble
      </h3>

      <div className="space-y-6 bg-white sm:space-y-7 md:space-y-8">
        <div
          className="flex w-full flex-col items-center justify-center bg-white pb-4"
          ref={gridRef}
        >
          {/* Labels */}
          <div className="mb-3 flex w-full items-center justify-center space-y-2 px-2 text-center font-semibold sm:mb-4 sm:flex-row sm:justify-between sm:space-y-0 sm:px-4 md:text-lg">
            <span style={{ color: COLORS.left }}>
              Left-Leaning ({leftPct}%)
            </span>
            <span style={{ color: COLORS.center }}>Center ({centerPct}%)</span>
            <span style={{ color: COLORS.right }}>
              Right-Leaning ({rightPct}%)
            </span>
          </div>

          {/* Grid Container with Copy Button */}
          <div className="relative bg-white">
            {/* Mobile Grid (10x10) */}
            <div className="flex gap-0.5 sm:hidden">
              {Array.from({ length: 10 }, (_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-0.5">
                  {squares
                    .slice(colIndex * 10, (colIndex + 1) * 10)
                    .map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          backgroundColor: showColor
                            ? COLORS[category]
                            : COLORS.empty,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.3,
                            delay: (colIndex * 10 + index) * 0.01,
                          },
                          scale: {
                            duration: 0.3,
                            delay: (colIndex * 10 + index) * 0.01,
                          },
                          backgroundColor: {
                            duration: 0.5,
                            delay: 1 + (colIndex * 10 + index) * 0.01,
                          },
                        }}
                        className="h-6 w-6 rounded-sm shadow-sm"
                      />
                    ))}
                </div>
              ))}
            </div>

            {/* Desktop Grid (20x5) */}
            <div className="hidden gap-1 sm:flex">
              {Array.from({ length: 20 }, (_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {squares
                    .slice(colIndex * 5, (colIndex + 1) * 5)
                    .map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          backgroundColor: showColor
                            ? COLORS[category]
                            : COLORS.empty,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.3,
                            delay: (colIndex * 5 + index) * 0.01,
                          },
                          scale: {
                            duration: 0.3,
                            delay: (colIndex * 5 + index) * 0.01,
                          },
                          backgroundColor: {
                            duration: 0.5,
                            delay: 1 + (colIndex * 5 + index) * 0.01,
                          },
                        }}
                        className="h-6 w-6 rounded-sm shadow-sm"
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-6 text-center sm:mt-7 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showFinal ? 1 : 0, y: showFinal ? 0 : 20 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-row items-center justify-center gap-4">
            <Button onClick={copyGridToClipboard} className="mb-4">
              <ClipboardIcon className="mr-2 h-4 w-4" /> Copy your results
            </Button>
            <Button onClick={downloadGrid} className="mb-4">
              <DownloadIcon className="mr-2 h-4 w-4" /> Download your results
            </Button>
          </div>
          <p className="mb-4 text-base sm:mb-5 sm:text-lg md:mb-6 md:text-xl">
            {getScoreMessage(leftPct, centerPct, rightPct).message}
          </p>

          {customCTA && customCTALink && (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="mb-4 text-base sm:mb-5 sm:text-sm md:text-base">
                {customCopy}
              </p>
              <Link
                href={customCTALink || "https://readtangle.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
              >
                {customCTA}
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </Card>
  );
};
