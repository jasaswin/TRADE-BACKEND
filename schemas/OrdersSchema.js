// const { Schema } = require("mongoose");

// const OrdersSchema = new Schema({
//   name: String,
//   qty: Number,
//   price: Number,
//   mode: String,
// });

// module.exports = { OrdersSchema };

import mongoose from "mongoose";

export const OrdersSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

