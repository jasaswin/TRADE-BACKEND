// const Lesson = require("../model/LessonModel");
// const Quiz = require("../model/QuizModel");

// // ✅ Get all lessons
// exports.getLessons = async (req, res) => {
//   try {
//     const lessons = await Lesson.find();
//     res.json(lessons);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching lessons", error });
//   }
// };

// // ✅ Get quizzes for a lesson
// exports.getQuizzes = async (req, res) => {
//   try {
//     const { lessonId } = req.params;
//     const quizzes = await Quiz.find({ lessonId });
//     res.json(quizzes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching quizzes", error });
//   }
// };

// // ✅ Submit quiz answers
// exports.submitQuiz = async (req, res) => {
//   try {
//     const { lessonId, answers } = req.body; // { qId: "selectedOption" }
//     const quizzes = await Quiz.find({ lessonId });

//     let score = 0;
//     quizzes.forEach((quiz) => {
//       if (answers[quiz._id] === quiz.answer) score++;
//     });

//     res.json({ score, total: quizzes.length });
//   } catch (error) {
//     res.status(500).json({ message: "Error submitting quiz", error });
//   }
// };



import Lesson from "../model/LessonModel.js";
import Quiz from "../model/QuizModel.js";

export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lessons", error });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quizzes = await Quiz.find({ lessonId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { lessonId, answers } = req.body;
    const quizzes = await Quiz.find({ lessonId });

    let score = 0;
    quizzes.forEach((quiz) => {
      if (answers[quiz._id] === quiz.answer) score++;
    });

    res.json({ score, total: quizzes.length });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
};
