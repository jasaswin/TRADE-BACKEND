// const mongoose = require("mongoose");

// const LessonSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   content: { type: String }, // lesson body (text, HTML, or markdown)
//   icon: { type: String, default: "📘" }, // emoji/icon
//   completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // track user completion
// }, { timestamps: true });

// module.exports = mongoose.model("Lesson", LessonSchema);



// const mongoose = require("mongoose");

// const LessonSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   content: { type: String },
//   difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
//   createdAt: { type: Date, default: Date.now }
// });

// // module.exports = mongoose.model("Lesson", LessonSchema);

// export const LessonModel = mongoose.model("Lesson", lessonSchema);



// backend/model/LessonModel.js
// import mongoose from "mongoose";

// const lessonSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   content: String,
// });

// export const LessonModel = mongoose.model("Lesson", lessonSchema);


// backend/model/LessonModel.js
// const mongoose = require("mongoose");

// const lessonSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   content: String,
// });

// module.exports = mongoose.model("Lesson", lessonSchema);



// import mongoose from "mongoose";

// const lessonSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   content: String,
// });

// const Lesson = mongoose.model("Lesson", lessonSchema);
// export default Lesson;


// import mongoose from "mongoose";

// const lessonSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   content: String,
// });

// export const LessonModel = mongoose.model("Lesson", lessonSchema);



import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
});

export const LessonModel = mongoose.model("Lesson", lessonSchema);
