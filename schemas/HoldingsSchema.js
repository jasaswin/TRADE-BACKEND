// const { Schema } = require("mongoose");

// const HoldingsSchema = new Schema({
//   name: String,
//   qty: Number,
//   avg: Number,
//   price: Number,
//   net: String,
//   day: String,
// });

// module.exports = { HoldingsSchema };




// import mongoose from "mongoose";

// export const HoldingsSchema = new mongoose.Schema({
//   name: String,
//   qty: Number,
//   avg: Number,
//   price: Number,
//   net: String,
//   day: String,
// });




import mongoose from "mongoose";

export const HoldingsSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true, default: 0 },
  avg: { type: Number, default: 0 },   // avg cost
  price: { type: Number, default: 0 }, // last traded price / ltp
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

HoldingsSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});
