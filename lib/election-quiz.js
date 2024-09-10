// lib/electionQuestions.js

const electionQuiz = {
  title: "U.S. Election Quiz",
  subtitle: "Test your knowledge on American election processes and history",
  questions: [
    {
      question:
        "In which year was the right to vote extended to all American women?",
      answers: {
        a: "1920",
        b: "1965",
      },
      correct: "a",
      explanation:
        "The 19th Amendment, ratified in 1920, granted women the right to vote nationwide.",
    },
    {
      question: "What is the minimum age to run for U.S. President?",
      answers: {
        a: "30 years old",
        b: "35 years old",
      },
      correct: "b",
      explanation:
        "The U.S. Constitution requires that presidential candidates be at least 35 years old.",
    },
    {
      question:
        "How many electoral college votes are needed to win the presidency?",
      answers: {
        a: "270",
        b: "218",
      },
      correct: "a",
      explanation:
        "A candidate needs a majority of 538 total electoral votes, which is 270, to win the presidency.",
    },
    {
      question:
        "Which state has historically been considered a key 'swing state' in presidential elections?",
      answers: {
        a: "California",
        b: "Florida",
      },
      correct: "b",
      explanation:
        "Florida has been known as a crucial swing state, often determining the outcome of close presidential races.",
    },
    {
      question: "What is 'gerrymandering'?",
      answers: {
        a: "Changing voting hours",
        b: "Redrawing district boundaries",
      },
      correct: "b",
      explanation:
        "Gerrymandering is the practice of redrawing electoral district boundaries to favor one political party or class.",
    },
    {
      question:
        "In U.S. presidential elections, what does the term 'October Surprise' refer to?",
      answers: {
        a: "Early voting results",
        b: "Last-minute news event",
      },
      correct: "b",
      explanation:
        "An 'October Surprise' is a news event deliberately created or timed to influence the outcome of an election, particularly one in November.",
    },
    {
      question: "What is the 'Iowa Caucus'?",
      answers: {
        a: "The first primary election",
        b: "A state legislative session",
      },
      correct: "a",
      explanation:
        "The Iowa Caucus is traditionally the first major contest of the United States presidential primary season.",
    },
  ],
};

export default electionQuiz;
