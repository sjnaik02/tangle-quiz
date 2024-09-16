// File: components/ResultMessage.jsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ResultMessage = ({ score, total }) => {
  const getResultMessage = () => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) {
      return "Outstanding! You're well-informed on current events. Join over 135,000 readers who trust Tangle to dive even deeper into the nuances of today's political landscape.";
    } else if (percentage >= 60) {
      return "Great job! You've got a solid grasp on current affairs. Discover why more than 135,000 readers rely on Tangle to fill in the gaps and provide more context to these complex issues.";
    } else if (percentage >= 40) {
      return "Good effort! There's always more to learn about politics and current events. Join 135,000+ readers who stay informed with Tangle's balanced, comprehensive coverage.";
    } else {
      return "Thanks for taking the quiz! The political world can be complex, but you're not alone. Over 135,000 readers trust Tangle to help them navigate it with clear, unbiased reporting.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-8 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-indigo-700">Quiz Completed!</h3>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-indigo-600 mb-4 sm:mb-6"
      >
        {Math.round((score / total) * 100)}%
      </motion.div>
      <p className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-gray-700">
        You got <span className="font-bold text-indigo-600">{score}</span> out of{" "}
        {total} questions correct
      </p>
      <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 italic text-gray-600">{getResultMessage()}</p>
      <Button asChild className="mt-4 sm:mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105">
        <Link
          href="https://readtangle.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Unbiased News Now!
        </Link>
      </Button>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Trusted by 135,000+ readers from all political backgrounds</p>
    </motion.div>
  );
};

export default ResultMessage;
