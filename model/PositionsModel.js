// const { model } = require("mongoose");

// const { PositionsSchema } = require("../schemas/PositionsSchema");

// const PositionsModel = new model("position", PositionsSchema);

// module.exports = { PositionsModel };


import mongoose from "mongoose";
import { PositionsSchema } from "../schemas/PositionsSchema.js";

export const PositionsModel = mongoose.model("position", PositionsSchema);
