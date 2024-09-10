// File: components/QuestionCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const QuestionCard = ({ question, index, onAnswer, selectedAnswer }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      onAnswer(index, answer);
      setShowExplanation(true);
    }
  };

  const explanationVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8 py-6 bg-white border-t border-gray-300"
    >
      <h3 className="text-sm md:text-base mb-2">Question {index + 1}</h3>
      <p className="text-lg mb-6">{question.question}</p>
      <div className="space-y-3 md:space-y-4">
        {Object.entries(question.answers).map(([key, value]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left p-4 rounded-md transition-all duration-200 flex items-center justify-between ${
              selectedAnswer
                ? key === question.correct
                  ? "bg-green-100 text-green-800"
                  : selectedAnswer === key
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            } text-base md:text-lg border border-gray-200`}
            onClick={() => handleAnswerClick(key)}
            disabled={selectedAnswer !== null}
          >
            <span>{value}</span>
            {selectedAnswer && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {key === question.correct ? (
                  <CheckCircle className="text-green-500" />
                ) : selectedAnswer === key ? (
                  <XCircle className="text-red-500" />
                ) : null}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={explanationVariants}
            className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md overflow-hidden"
          >
            <p className="text-sm md:text-base text-blue-800">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;
