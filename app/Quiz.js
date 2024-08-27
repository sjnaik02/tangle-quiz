import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import questions from "@/lib/questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correct;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center font-serif">
        Tangle News Quiz
      </h1>
      <div className="mb-6 bg-gray-200 h-2">
        <div
          className="bg-[#567b95] h-2 transition-all duration-500 ease-out"
          style={{
            width: `${
              ((currentQuestion + (selectedAnswer ? 1 : 0)) /
                questions.length) *
              100
            }%`,
          }}
        ></div>
      </div>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-serif">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h3 className="text-xl md:text-2xl mb-4 md:mb-6 font-serif">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3 md:space-y-4 mb-6">
              {Object.entries(questions[currentQuestion].answers).map(
                ([key, value]) => (
                  <button
                    key={key}
                    className={`w-full text-left p-3 md:p-4 text-base md:text-lg font-serif border border-gray-300 hover:bg-gray-100 transition-colors ${
                      selectedAnswer
                        ? key === questions[currentQuestion].correct
                          ? "bg-green-100 border-green-500"
                          : selectedAnswer === key
                          ? "bg-red-100 border-red-500"
                          : "bg-gray-100"
                        : ""
                    }`}
                    onClick={() => !selectedAnswer && handleAnswer(key)}
                    disabled={selectedAnswer !== null}
                  >
                    {value}
                  </button>
                )
              )}
            </div>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md"
                >
                  <p className="text-sm md:text-base font-serif">
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {selectedAnswer && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center justify-center bg-[#567b95] hover:bg-[#45647a] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next"}
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              Quiz Completed!
            </h3>
            <p className="text-xl md:text-2xl mb-4 font-serif">
              Your score: {score} out of {questions.length}
            </p>
            <p className="text-lg md:text-xl mb-6 font-serif italic">
              {getResultMessage()}
            </p>
            <Link
              href="https://readtangle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#567b95] hover:bg-[#45647a] text-white font-bold py-3 px-6 text-base md:text-lg font-serif transition-colors duration-300 rounded"
            >
              Explore Unbiased Political Coverage
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
