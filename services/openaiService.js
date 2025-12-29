import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate interview questions based on role & experience
 */
export const generateInterviewQuestions = async (
  jobRole,
  experienceLevel
) => {
  const prompt = `
Generate 5 interview questions for a ${jobRole} developer
with ${experienceLevel} experience level.
Questions should be clear and relevant.
Return only the questions as a numbered list.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = response.choices[0].message.content;

  // Convert numbered list into array
  const questions = text
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^\d+\.\s*/, ""));

  return questions;
};

/**
 * Evaluate interview answers using AI
 */
export const evaluateInterviewAnswers = async (
  jobRole,
  questions,
  answers
) => {
  const qaText = questions
    .map(
      (q, i) =>
        `Question: ${q}\nAnswer: ${answers[i]}`
    )
    .join("\n\n");

  const prompt = `
You are an interview evaluator for a ${jobRole} role.

Evaluate the following answers and provide:
1. Overall feedback
2. Strengths
3. Weaknesses
4. Suggestions for improvement
5. A score out of 10

${qaText}

Return the response in this format:
Feedback:
Score:
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  const resultText = response.choices[0].message.content;

  // Simple parsing
  const scoreMatch = resultText.match(/Score:\s*(\d+)/);
  const score = scoreMatch ? Number(scoreMatch[1]) : 5;

  return {
    feedback: resultText,
    score,
  };
};
