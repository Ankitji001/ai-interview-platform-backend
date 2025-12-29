import mongoose from "mongoose";

const interviewAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    questions: {
      type: [String],
      required: true,
    },

    answers: {
      type: [String],
      required: true,
    },

    aiFeedback: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InterviewAttempt = mongoose.model(
  "InterviewAttempt",
  interviewAttemptSchema
);

export default InterviewAttempt;
