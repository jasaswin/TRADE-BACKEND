
// // backend/scripts/assignUserToHoldings.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { HoldingsModel } from "../model/HoldingsModel.js";

// dotenv.config();
// const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/tradenest";

// const TARGET_USERNAME = "meee";     // set to the user you want to assign
// const MATCH_NAME = "ONGC";          // set to the stock name, or remove/filter differently

// (async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected");

//     // update holdings missing username and matching name
//     const res = await HoldingsModel.updateMany(
//       { name: MATCH_NAME, $or: [{ username: { $exists: false } }, { username: null }, { username: "" }] },
//       { $set: { username: TARGET_USERNAME } }
//     );

//     console.log("Updated:", res.nModified || res.modifiedCount || res);
//     process.exit(0);
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// })();



// backend/scripts/assignUserToHoldings.js
// backend/scripts/assignUserToHoldings.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { HoldingsModel } from "../model/HoldingsModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/tradenest";
const TARGET_USERNAME = "meee"; // change if needed
const NAMES_TO_UPDATE = ["ONGC", "HUL", "WIPRO"]; // set to null to update all holdings missing username

(async () => {
  try {
    // modern connect (no deprecated options)
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const filterBase = { $or: [{ username: { $exists: false } }, { username: null }, { username: "" }] };

    const filter =
      NAMES_TO_UPDATE && NAMES_TO_UPDATE.length
        ? { $and: [filterBase, { name: { $in: NAMES_TO_UPDATE } }] }
        : filterBase;

    const update = { $set: { username: TARGET_USERNAME } };

    const res = await HoldingsModel.updateMany(filter, update);

    // Print detailed response; driver version differences handled
    console.log("Raw response:", res);
    console.log("Matched:", res.matchedCount ?? res.n ?? "unknown");
    console.log("Modified:", res.modifiedCount ?? res.nModified ?? "unknown");

    await mongoose.disconnect();
    console.log("✅ Done.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
