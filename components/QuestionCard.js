// File: components/QuestionCard.jsx
import { useState } from "react";
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
              selectedAnswer
                ? key === question.correct
                  ? "bg-green-100 text-green-800"
                  : selectedAnswer === key
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                : "bg-gray-50 text-gray-800 hover:bg-gray-100"
            } border border-gray-200 text-base md:text-lg`}
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
            className="mt-4 overflow-hidden rounded-r-md border-l-4 border-blue-500 bg-blue-50 p-4"
          >
            <p className="text-sm text-blue-800 md:text-base">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;
