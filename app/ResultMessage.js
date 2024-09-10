// File: components/ResultMessage.jsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ResultMessage = ({ score, total }) => {
  const getResultMessage = () => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) {
      return "Outstanding! You're well-informed on current events. Tangle can help you dive even deeper into the nuances of today's political landscape.";
    } else if (percentage >= 60) {
      return "Great job! You've got a solid grasp on current affairs. Tangle can help fill in the gaps and provide more context to these complex issues.";
    } else if (percentage >= 40) {
      return "Good effort! There's always more to learn about politics and current events. Tangle can help you stay informed with balanced, comprehensive coverage.";
    } else {
      return "Thanks for taking the quiz! The political world can be complex, but Tangle is here to help you navigate it with clear, unbiased reporting.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-white p-6 border-t border-b border-gray-200"
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4">Quiz Completed!</h3>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-6xl font-bold text-blue-600 mb-4"
      >
        {Math.round((score / total) * 100)}%
      </motion.div>
      <p className="text-xl md:text-2xl mb-4">
        You got <span className="font-bold text-blue-600">{score}</span> out of{" "}
        {total} questions correct
      </p>
      <p className="text-lg md:text-xl mb-6 italic">{getResultMessage()}</p>
      <Button asChild className="mt-4">
        <Link
          href="https://readtangle.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Unbiased Political Coverage
        </Link>
      </Button>
    </motion.div>
  );
};

export default ResultMessage;
