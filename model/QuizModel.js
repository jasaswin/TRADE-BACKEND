// const mongoose = require("mongoose");

// const QuizSchema = new mongoose.Schema({
//   lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
//   question: { type: String, required: true },
//   options: [{ type: String, required: true }],
//   answer: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model("Quiz", QuizSchema);

// export const QuizModel = mongoose.model("Quiz", quizSchema);






// backend/model/QuizModel.js
// import mongoose from "mongoose";

// const quizSchema = new mongoose.Schema({
//   lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
//   question: String,
//   options: [String],
//   answer: String,
// });

// export const QuizModel = mongoose.model("Quiz", quizSchema);


// backend/model/QuizModel.js
// const mongoose = require("mongoose");

// const quizSchema = new mongoose.Schema({
//   lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
//   question: String,
//   options: [String],
//   answer: String,
// });

// module.exports = mongoose.model("Quiz", quizSchema);


// import mongoose from "mongoose";

// const quizSchema = new mongoose.Schema({
//   lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
//   question: String,
//   options: [String],
//   answer: String,
// });

// const Quiz = mongoose.model("Quiz", quizSchema);
// export default Quiz;



// import mongoose from "mongoose";

// const quizSchema = new mongoose.Schema({
//   lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
//   question: String,
//   options: [String],
//   answer: String,
// });

// export const QuizModel = mongoose.model("Quiz", quizSchema);


import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  question: String,
  options: [String],
  correctAnswer: String,
});

export const QuizModel = mongoose.model("Quiz", quizSchema);


