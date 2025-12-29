export const generateInterviewQuestions = async () => {
  return [
    "What is React and why is it used?",
    "Explain props vs state.",
    "What are React hooks?",
    "What is virtual DOM?",
    "How does useEffect work?"
  ];
};

export const evaluateInterviewAnswers = async () => {
  return {
    feedback: `
Strengths:
- Good understanding of basics

Weaknesses:
- Needs deeper explanation

Suggestions:
- Practice hooks and lifecycle

Overall Feedback:
Promising candidate with scope to improve.
    `,
    score: 6
  };
};
