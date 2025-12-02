

// backend/routes/tradeRoutes.js
// import express from "express";
// import { newOrder } from "../controllers/orderController.js";

// const router = express.Router();
// router.post("/newOrder", newOrder);
// export default router;




// backend/routes/tradeRoutes.js
import express from "express";
import { newOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/newOrder", newOrder);

// also add convenience endpoints if you want
router.get("/allHoldings", async (req, res) => {
  try {
    // return all holdings (for debug / dashboard)
    const { HoldingsModel } = await import("../model/HoldingsModel.js");
    const list = await HoldingsModel.find({});
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch holdings" });
  }
});

router.get("/user/:username/summary", async (req, res) => {
  try {
    const username = req.params.username;
    const { HoldingsModel } = await import("../model/HoldingsModel.js");
    const allHoldings = await HoldingsModel.find({ username });
    const totalInvestment = allHoldings.reduce((acc, h) => acc + ((h.avg || 0) * (h.qty || 0)), 0);
    const currentValue = allHoldings.reduce((acc, h) => acc + ((h.price || 0) * (h.qty || 0)), 0);
    const totalPL = currentValue - totalInvestment;
    res.json({ balance: 0, totalInvestment, currentValue, totalPL, equity: currentValue });
  } catch (err) {
    res.status(500).json({ error: "Cannot compute summary" });
  }
});

export default router;
