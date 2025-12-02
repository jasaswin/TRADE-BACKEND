// const { model } = require("mongoose");

// const { OrdersSchema } = require("../schemas/OrdersSchema");

// const OrdersModel = new model("order", OrdersSchema);

// module.exports = { OrdersModel };



import mongoose from "mongoose";
import { OrdersSchema } from "../schemas/OrdersSchema.js";

export const OrdersModel = mongoose.model("order", OrdersSchema);

