


// backend/controllers/orderController.js
import mongoose from "mongoose";
import { HoldingsModel } from "../model/HoldingsModel.js";
import { OrdersModel } from "../model/OrdersModel.js";

/**
 * POST /newOrder
 * body: { name, qty, price, mode: "BUY"|"SELL", username }
 */
export const newOrder = async (req, res) => {
  try {
    const { name, qty: rawQty, price: rawPrice, mode, username } = req.body;
    const qty = Math.floor(Number(rawQty) || 0);
    const price = Number(rawPrice) || 0;

    if (!username) return res.status(400).json({ error: "Missing username" });
    if (!name || qty <= 0 || price <= 0) return res.status(400).json({ error: "Invalid order params" });
    if (!["BUY", "SELL"].includes(mode)) return res.status(400).json({ error: "Invalid mode" });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // create order document
      const newOrderDoc = await OrdersModel.create([{
        username,
        name,
        qty,
        price,
        mode,
        createdAt: new Date()
      }], { session });

      // find existing holding
      let holding = await HoldingsModel.findOne({ username, name }).session(session);

      if (mode === "BUY") {
        if (holding) {
          const totalExisting = (holding.avg || holding.price || 0) * (holding.qty || 0);
          const totalNew = price * qty;
          const newQty = (holding.qty || 0) + qty;
          const newAvg = newQty ? (totalExisting + totalNew) / newQty : price;

          holding.qty = newQty;
          holding.avg = newAvg;
          holding.price = price;
          await holding.save({ session });
        } else {
          const created = await HoldingsModel.create([{
            username,
            name,
            qty,
            avg: price,
            price,
            createdAt: new Date()
          }], { session });

          holding = Array.isArray(created) ? created[0] : created;
        }
      } else { // SELL
        if (!holding) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({ error: "No holding to sell" });
        }
        if (qty > holding.qty) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({ error: "Insufficient quantity" });
        }

        const newQty = holding.qty - qty;
        if (newQty <= 0) {
          await HoldingsModel.deleteOne({ _id: holding._id }).session(session);
          holding = null;
        } else {
          holding.qty = newQty;
          holding.price = price;
          await holding.save({ session });
        }
      }

      // recompute summary
      const allHoldings = await HoldingsModel.find({ username }).session(session);
      const totalInvestment = allHoldings.reduce((acc, h) => acc + ((h.avg || 0) * (h.qty || 0)), 0);
      const currentValue = allHoldings.reduce((acc, h) => acc + ((h.price || 0) * (h.qty || 0)), 0);
      const totalPL = currentValue - totalInvestment;
      const userSummary = {
        balance: 0,
        totalInvestment,
        currentValue,
        totalPL,
        equity: currentValue
      };

      await session.commitTransaction();
      session.endSession();

      return res.json({
        success: true,
        updatedHolding: holding ? {
          _id: holding._id,
          username: holding.username,
          name: holding.name,
          qty: holding.qty,
          avg: holding.avg,
          price: holding.price
        } : null,
        userSummary
      });
    } catch (innerErr) {
      await session.abortTransaction();
      session.endSession();
      console.error("transaction error", innerErr);
      return res.status(500).json({ error: "Order processing failed" });
    }
  } catch (err) {
    console.error("newOrder error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};




// add at bottom of your existing orderController.js
export const getOrdersByUser = async (req, res) => {
  try {
    const username = req.query.username || req.params.username;
    if (!username) return res.status(400).json({ error: "Missing username" });

    // adjust model import depending on how you export
    const orders = await OrdersModel.find({ username }).sort({ createdAt: -1 }).lean();
    return res.json(orders);
  } catch (err) {
    console.error("getOrdersByUser error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
