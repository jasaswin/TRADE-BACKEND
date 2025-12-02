

// backend/scripts/mergeHoldings.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://localhost:27017/tradenest";

const holdingsCollName = "holdings"; // adjust if needed; model name may produce 'holdings' collection

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const col = db.collection(holdingsCollName);

    // Group by username+name to find duplicates
    const groups = await col
      .aggregate([
        {
          $group: {
            _id: { username: "$username", name: "$name" },
            ids: { $push: "$_id" },
            qtySum: { $sum: { $toDouble: "$qty" } },
            avgWeightedNum: {
              $sum: { $multiply: [{ $toDouble: "$avg" }, { $toDouble: "$qty" }] },
            },
            lastDoc: { $last: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ])
      .toArray();

    console.log("Groups with duplicates:", groups.length);

    for (const g of groups) {
      const username = g._id.username;
      const name = g._id.name;
      const ids = g.ids;
      const qtySum = Number(g.qtySum || 0);
      const avgWeightedNum = Number(g.avgWeightedNum || 0);
      const newAvg = qtySum > 0 ? avgWeightedNum / qtySum : g.lastDoc.avg || 0;
      const lastDoc = g.lastDoc || {};

      console.log(`Merging ${ids.length} docs for ${username} / ${name} -> qty=${qtySum}, avg=${newAvg}`);

      // Keep first id in list, update it
      const keepId = ids[0];
      const removeIds = ids.filter((id) => String(id) !== String(keepId));

      // update keepId doc
      await col.updateOne(
        { _id: keepId },
        {
          $set: {
            qty: qtySum,
            avg: newAvg,
            price: lastDoc.price,
            net: lastDoc.net || "+0",
            day: lastDoc.day || "+0",
            username: username,
            name: name,
          },
        }
      );

      // delete the rest
      const deleteRes = await col.deleteMany({ _id: { $in: removeIds } });
      console.log(`  kept ${keepId}, deleted ${deleteRes.deletedCount} docs`);
    }

    // (Optional) Create unique index on username+name to prevent future duplicates
    try {
      await col.createIndex({ username: 1, name: 1 }, { unique: true, background: false });
      console.log("✅ Created unique index on {username, name}");
    } catch (e) {
      console.warn("Could not create unique index (maybe duplicates still exist):", e.message || e);
    }

    console.log("✅ Done.");
    process.exit(0);
  } catch (err) {
    console.error("Script error:", err);
    process.exit(1);
  }
})();
