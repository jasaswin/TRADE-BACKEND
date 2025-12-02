
// backend/scripts/assignUserToHoldings_fix.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/tradenest";
const TARGET_USERNAME = "meee"; // change if needed
const NAMES_TO_UPDATE = ["ONGC", "HUL", "WIPRO"]; // set to null to update all missing username

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const collectionName = "holdings"; // collection should be plural by default
    const coll = db.collection(collectionName);

    // filter: missing/empty username AND optional name list
    const baseFilter = { $or: [{ username: { $exists: false } }, { username: null }, { username: "" }] };
    const filter = Array.isArray(NAMES_TO_UPDATE) && NAMES_TO_UPDATE.length
      ? { $and: [baseFilter, { name: { $in: NAMES_TO_UPDATE } }] }
      : baseFilter;

    console.log("Running update with filter:", JSON.stringify(filter));

    const result = await coll.updateMany(filter, { $set: { username: TARGET_USERNAME } });

    console.log("Raw result:", result);
    // driver v4+ uses acknowledged, matchedCount, modifiedCount
    console.log("acknowledged:", result.acknowledged);
    console.log("matchedCount:", result.matchedCount);
    console.log("modifiedCount:", result.modifiedCount);

    await mongoose.disconnect();
    console.log("✅ Done.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during update:", err);
    process.exit(1);
  }
})();
