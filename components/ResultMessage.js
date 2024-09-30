// File: components/ResultMessage.jsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ResultMessage = ({ score, total, customCopy, customCTA, customCTALink }) => {
  const getScoreBasedMessage = () => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) {
      return "Outstanding Perfomance!";
    } else if (percentage >= 60) {
      return "Great job!";
    } else if (percentage >= 40) {
      return "Good effort!";
    } else {
      return "Thanks for taking the quiz!";
    }
  };

  const getResultMessage = () => {
    const scoreBasedMessage = getScoreBasedMessage();
    if (customCopy) {
      return ` ${customCopy}`;
    } else {
      const percentage = (score / total) * 100;
      if (percentage >= 80) {
        return ` You're well-informed on current events. Dive even deeper with Tangle's nuanced political coverage.`;
      } else if (percentage >= 60) {
        return ` You've got a solid grasp on current affairs. Fill in the gaps with Tangle's comprehensive analysis.`;
      } else if (percentage >= 40) {
        return ` There's always more to learn. Stay informed with Tangle's balanced, in-depth reporting.`;
      } else {
        return ` Politics can be complex. Let Tangle help you navigate with clear, unbiased news.`;
      }
    }
  };

  const ctaText = customCTA || "Join 135,000+ Informed Readers - Get Tangle Now!";
  const ctaLink = customCTALink || "https://readtangle.com/subscribe";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-white shadow-md rounded-lg p-8"
    >
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">Your Results</h3>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
        className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-6"
      >
        {Math.round((score / total) * 100)}%
      </motion.div>
      <p className="text-xl sm:text-2xl md:text-3xl mb-6 text-gray-700">
        You got <span className="font-bold text-gray-900">{score}</span> out of{" "}
        <span className="font-bold text-gray-900">{total}</span> questions correct
      </p>
      <p className="text-base sm:text-base md:text-xl mb-8 text-gray-600"><strong>{getScoreBasedMessage()}</strong> {getResultMessage()}</p>
      <Link
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full sm:w-auto rounded-md bg-gradient-to-r from-red-600 to-blue-600 px-6 py-3 text-lg sm:text-xl font-medium text-white hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        {ctaText}
      </Link>
      <p className="mt-4 text-sm sm:text-base text-gray-500">Unbiased news trusted by 135,000+ readers across the political spectrum</p>
    </motion.div>
  );
};

export default ResultMessage;
