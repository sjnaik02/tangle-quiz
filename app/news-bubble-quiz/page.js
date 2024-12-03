"use client";
import React from "react";
import ScoreQuiz from "@/components/ScoreQuiz";
import newsBubbleQuestions from "@/lib/news-bubble-quiz";

const QuizPage = () => {
  return (
    <div>
      <ScoreQuiz questions={newsBubbleQuestions} />
    </div>
  );
};

export default QuizPage;
