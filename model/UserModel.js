
// // models/UserModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   balance: { type: Number, default: 100000 }, // initial funds
//   equityValue: { type: Number, default: 0 },
//   totalPL: { type: Number, default: 0 },
// });

// export default mongoose.model("User", userSchema);



// // backend/model/UserModel.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const { isEmail } = require('validator');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, lowercase: true, validate: [isEmail, 'Invalid email'] },
//   password: { type: String, required: true, minlength: 6 },
//   createdAt: { type: Date, default: Date.now }
// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // instance method to compare password
// userSchema.methods.comparePassword = function (plain) {
//   return bcrypt.compare(plain, this.password);
// };

// module.exports = mongoose.model('User', userSchema);



// backend/model/UserModel.js
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { isEmail } = validator;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: [isEmail, "Invalid email"] },
  password: { type: String, required: true, minlength: 6 },
  balance: { type: Number, default: 100000 }, // default virtual balance, adjust if needed
  equityValue: { type: Number, default: 0 },
  totalPL: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// pre-save: hash password if modified
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// instance method to compare password
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Export default model so `import UserModel from "./model/UserModel.js"` works
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
