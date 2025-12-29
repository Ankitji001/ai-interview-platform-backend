import express from "express";
import {
  generateQuestions,
  submitAnswers,
  getMyAttempts,
} from "../controllers/interviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Candidate: Generate AI interview questions
 */
router.post(
  "/generate",
  authMiddleware,
  roleMiddleware(["candidate"]),
  generateQuestions
);

/**
 * Candidate: Submit answers and get AI feedback
 */
router.post(
  "/submit",
  authMiddleware,
  roleMiddleware(["candidate"]),
  submitAnswers
);

/**
 * Candidate: View own interview attempts
 */
router.get(
  "/my-attempts",
  authMiddleware,
  roleMiddleware(["candidate"]),
  getMyAttempts
);

export default router;
