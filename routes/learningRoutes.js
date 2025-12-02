// const express = require("express");
// const router = express.Router();
// const learningController = require("../controllers/learningController");

// // Lessons
// router.get("/lessons", learningController.getLessons);

// // Quizzes
// router.get("/quiz/:lessonId", learningController.getQuizzes);

// // Submit Quiz
// router.post("/quiz/submit", learningController.submitQuiz);

// module.exports = router;



// import express from "express";
// import {
//   getLessons,
//   getQuizzes,
//   submitQuiz,
// } from "../controllers/learningController.js";

// const router = express.Router();

// // ✅ Get all lessons
// router.get("/lessons", getLessons);

// // ✅ Get quizzes for a specific lesson
// router.get("/quiz/:lessonId", getQuizzes);

// // ✅ Submit quiz answers
// router.post("/quiz/submit", submitQuiz);

// export default router;



// import express from "express";
// import { LessonModel } from "../model/LessonModel.js";
// import { QuizModel } from "../model/QuizModel.js";

// const router = express.Router();

// // Get all lessons
// router.get("/lessons", async (req, res) => {
//   try {
//     const lessons = await LessonModel.find({});
//     res.json(lessons);
//   } catch (error) {
//     console.error("Error fetching lessons:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Get quizzes for a specific lesson
// router.get("/quizzes/:lessonId", async (req, res) => {
//   try {
//     const { lessonId } = req.params;
//     const quizzes = await QuizModel.find({ lessonId });
//     res.json(quizzes);
//   } catch (error) {
//     console.error("Error fetching quizzes:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;


import express from "express";
import { LessonModel } from "../model/LessonModel.js";
import { QuizModel } from "../model/QuizModel.js";

const router = express.Router();

// Get all lessons
router.get("/lessons", async (req, res) => {
  try {
    const lessons = await LessonModel.find({});
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get quizzes for a lesson
router.get("/quizzes/:lessonId", async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quizzes = await QuizModel.find({ lessonId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

