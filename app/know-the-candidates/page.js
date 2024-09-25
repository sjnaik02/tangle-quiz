"use client";
import React from "react";
import Quiz from "../../components/Quiz";
import knowTheCandidatesQuiz from "../../lib/know-the-candiates-quiz";
import BetaCallout from "@/components/BetaCallout";

const QuizPage = () => {
  return (
    <div>
      <BetaCallout />
      <Quiz questions={knowTheCandidatesQuiz} />
    </div>
  );
};

export default QuizPage;
