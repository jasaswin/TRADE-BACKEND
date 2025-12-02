// const { Schema } = require("mongoose");

// const PositionsSchema = new Schema({
//   product: String,
//   name: String,
//   qty: Number,
//   avg: Number,
//   price: Number,
//   net: String,
//   day: String,
//   isLoss: Boolean,
// });

// module.exports = { PositionsSchema };



import mongoose from "mongoose";

export const PositionsSchema = new mongoose.Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

