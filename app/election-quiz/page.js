"use client";
import React from "react";
import Quiz from "../Quiz";
import electionQuiz from "../../lib/election-quiz";

const QuizPage = () => {
  return (
    <div>
      <Quiz questions={electionQuiz} />
    </div>
  );
};

export default QuizPage;
