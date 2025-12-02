// const { model } = require("mongoose");

// const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// const HoldingsModel = new model("holding", HoldingsSchema);

// module.exports = { HoldingsModel };


import mongoose from "mongoose";
import { HoldingsSchema } from "../schemas/HoldingsSchema.js";

export const HoldingsModel = mongoose.model("holding", HoldingsSchema);
