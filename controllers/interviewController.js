import InterviewAttempt from "../models/InterviewAttempt.js";
import {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
} from "../services/openaiService.js";


/**
 * Generate AI interview questions
 * Candidate selects role & experience level
 */
export const generateQuestions = async (req, res) => {
  try {
    return res.json({
      questions: [
        "What is React?",
        "Explain props vs state.",
        "What are hooks?",
        "What is virtual DOM?",
        "How does useEffect work?",
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * Submit answers and get AI feedback
 */
export const submitAnswers = async (req, res) => {
  try {
    const { jobRole, questions, answers } = req.body;

    if (!questions || !answers || questions.length !== answers.length) {
      return res.status(400).json({
        message: "Questions and answers mismatch",
      });
    }

    const feedback = await evaluateInterviewAnswers(
      jobRole,
      questions,
      answers
    );

    const attempt = await InterviewAttempt.create({
      userId: req.user.id,
      jobRole,
      questions,
      answers,
      aiFeedback: feedback.feedback,
      score: feedback.score,
    });

    res.status(201).json({
      message: "Interview evaluated successfully",
      attempt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all interview attempts of logged-in candidate
 */
export const getMyAttempts = async (req, res) => {
  try {
    const attempts = await InterviewAttempt.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
