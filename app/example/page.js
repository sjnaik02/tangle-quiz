"use client";
import React from "react";
import Quiz from "../Quiz";
import exampleQuestions from "../../lib/example-quiz";

const QuizPage = () => {
  return (
    <div>
      <Quiz questions={exampleQuestions} />
    </div>
  );
};

export default QuizPage;
