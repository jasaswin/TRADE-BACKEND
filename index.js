




// backend/index.js

// ✅ Imports
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator"; // add near top of file where other imports are

// // ✅ Models
import { authMiddleware } from "./middleware/authMiddleware.js";

import { HoldingsModel } from "./model/HoldingsModel.js";
import { PositionsModel } from "./model/PositionsModel.js";
import { OrdersModel } from "./model/OrdersModel.js";
import UserModel from "./model/UserModel.js";

import authRoutes from "./routes/authRoutes.js";


import tradeRoutes from "./routes/tradeRoutes.js";



// // ✅ Routes
import learningRoutes from "./routes/learningRoutes.js";

// // ✅ Initialize app and environment
dotenv.config();
const app = express();




// // // JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_for_prod";

// // ✅ Middleware

app.use(
  cors({
    origin: [
      "http://localhost:3000", // dashboard
      "http://localhost:3001", // frontend
       "https://tradefrontendup.vercel.app",
      "https://tradedashboardup.vercel.app",
      "https://trade-backend-ihxu.onrender.com" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);

// // -----------------
// // Auth: Signup route
// // -----------------



app.use("/api/trade", tradeRoutes);



app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic presence checks
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required." });
    }

    // Server-side email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format. Use example@domain.com" });
    }

    // Optional: password length check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Check if user exists
    const existing = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existing) {
      return res.status(409).json({ message: "Username or email already taken" });
    }

    // Hash password and save
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashed,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User created",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    // Handle mongoose validation error explicitly
    if (err && err.name === "ValidationError") {
      // Build a readable message from validation errors
      const messages = Object.values(err.errors).map((e) => e.message);
      console.error("Validation Error during signup:", messages);
      return res.status(400).json({ message: messages.join(", ") });
    }

    console.error("❌ Error in /api/auth/signup:", err);
    return res.status(500).json({ message: "Server error" });
  }
});



// // -----------------
// // Mount existing routes
// // -----------------
app.use("/api/learning", learningRoutes);

// // ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// // ✅ Test route
app.get("/test", (req, res) => {
  res.send("✅ /test route working!");
});

// // ✅ Holdings route
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// // ✅ Positions route
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Replace the existing POST /newOrder route with this code in backend/index.js

// app.post("/newOrder", async (req, res) => {
//   try {
//     const { name, qty, price, mode, username } = req.body;

//     console.log("🟢 Received order:", req.body);

//     if (!name || !qty || !price || !mode || !username) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // find user
//     const user = await UserModel.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // create an order record (for audit)
//     const newOrder = new OrdersModel({ name, qty, price, mode, username, createdAt: new Date() });
//     await newOrder.save();

//     // find existing holding for the user and symbol
//     let holding = await HoldingsModel.findOne({ username, name });

    
// // -----------------
// // BUY handling (replace existing BUY branch)
// if (mode === "BUY") {
//   const totalCost = price * qty;

//   if (user.balance < totalCost) {
//     return res.status(400).json({ error: "Insufficient balance" });
//   }

//   user.balance -= totalCost;

//   // find existing holding for this user + instrument
//   let holding = await HoldingsModel.findOne({ username, name });

//   if (holding) {
//     const totalQty = holding.qty + qty;
//     const newAvg = (holding.avg * holding.qty + price * qty) / totalQty;
//     holding.qty = totalQty;
//     holding.avg = newAvg;
//     holding.price = price; // update LTP
//   } else {
//     // IMPORTANT: include username so the holding belongs to the user
//     holding = new HoldingsModel({
//       username, // <--- ensure this exists
//       name,
//       qty,
//       avg: price,
//       price,
//       net: "+0",
//       day: "+0",
//     });
//   }

//   await holding.save();
//   await user.save();

//   return res.status(201).json({
//     message: "Order processed successfully!",
//     updatedHolding: {
//       _id: holding._id,
//       username: holding.username,
//       name: holding.name,
//       qty: holding.qty,
//       avg: holding.avg,
//       price: holding.price,
//       net: holding.net,
//       day: holding.day,
//     },
//     userSummary: {
//       balance: user.balance,
//       equity: user.equityValue,
//       totalPL: user.totalPL,
//     },
//   });
// }



//     // compute user summary (based on current holdings for the user)
//     const userHoldings = await HoldingsModel.find({ username });

//     const totalInvestment = userHoldings.reduce((acc, h) => acc + (h.avg || 0) * (h.qty || 0), 0);
//     const currentValue = userHoldings.reduce((acc, h) => acc + (h.price || 0) * (h.qty || 0), 0);
//     const equity = (user.balance || 0) + currentValue;
//     const totalPL = currentValue - totalInvestment;

//     const userSummary = {
//       balance: user.balance,
//       totalInvestment,
//       currentValue,
//       equity,
//       totalPL,
//     };

//     // return the updated holding (or null if deleted) and summary
//     res.status(201).json({
//       message: "Order processed successfully!",
//       updatedHolding: holding ? {
//         username: holding.username,
//         name: holding.name,
//         qty: holding.qty,
//         avg: holding.avg,
//         price: holding.price,
//         net: holding.net,
//         day: holding.day,
//         _id: holding._id
//       } : null,
//       userSummary,
//     });
//   } catch (err) {
//     console.error("❌ Error saving order:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// Replace the existing /newOrder route with this block
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty: rawQty, price: rawPrice, mode, username } = req.body;

    // basic validation
    if (!name || !rawQty || !rawPrice || !mode || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const qty = Number(rawQty);
    const price = Number(rawPrice);
    if (!Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid qty or price" });
    }

    console.log("🟢 Received order:", { name, qty, price, mode, username });

    // find the user
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // create an order record (audit)
    const newOrder = new OrdersModel({ name, qty, price, mode, username, createdAt: new Date() });
    await newOrder.save();

    // Helper: compute summary from user's holdings
    const computeUserSummary = async (username) => {
      const userHoldings = await HoldingsModel.find({ username });
      const totalInvestment = userHoldings.reduce((acc, h) => acc + (Number(h.avg) || 0) * (Number(h.qty) || 0), 0);
      const currentValue = userHoldings.reduce((acc, h) => acc + (Number(h.price) || 0) * (Number(h.qty) || 0), 0);
      const equity = (user.balance || 0) + currentValue;
      const totalPL = currentValue - totalInvestment;
      return {
        balance: user.balance,
        totalInvestment,
        currentValue,
        equity,
        totalPL,
      };
    };

    // Handle BUY
    if (mode === "BUY") {
      const totalCost = price * qty;

      if (user.balance < totalCost) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // subtract balance
      user.balance -= totalCost;

      // find existing canonical holding (one doc per user+name)
      let holding = await HoldingsModel.findOne({ username, name });

      if (holding) {
        // update weighted average and qty
        const existingQty = Number(holding.qty || 0);
        const existingAvg = Number(holding.avg || 0);
        const newQty = existingQty + qty;
        const newAvg = newQty > 0 ? (existingAvg * existingQty + price * qty) / newQty : price;
        holding.qty = newQty;
        holding.avg = newAvg;
        holding.price = price; // update LTP
        await holding.save();
      } else {
        // create canonical holding with username
        holding = new HoldingsModel({
          username,
          name,
          qty,
          avg: price,
          price,
          net: "+0",
          day: "+0",
        });
        await holding.save();
      }

      await user.save();

      const userSummary = await computeUserSummary(username);

      return res.status(201).json({
        message: "Order processed successfully!",
        updatedHolding: {
          _id: holding._id,
          username: holding.username,
          name: holding.name,
          qty: holding.qty,
          avg: holding.avg,
          price: holding.price,
          net: holding.net,
          day: holding.day,
        },
        userSummary,
      });
    }

    // Handle SELL
    if (mode === "SELL") {
      // find canonical holding for this user+symbol
      const holding = await HoldingsModel.findOne({ username, name });

      if (!holding || Number(holding.qty || 0) <= 0) {
        return res.status(400).json({ error: "Not enough holdings to sell" });
      }

      const holdingQty = Number(holding.qty || 0);

      if (qty > holdingQty) {
        return res.status(400).json({ error: "Not enough holdings to sell" });
      }

      // increase user balance by sale proceeds
      user.balance += price * qty;

      // reduce holding qty
      holding.qty = holdingQty - qty;

      let updatedHolding = null;
      if (holding.qty <= 0) {
        // remove the doc if qty 0
        await HoldingsModel.deleteOne({ _id: holding._id });
        updatedHolding = null;
      } else {
        // update price (LTP)
        holding.price = price;
        await holding.save();
        updatedHolding = {
          _id: holding._id,
          username: holding.username,
          name: holding.name,
          qty: holding.qty,
          avg: holding.avg,
          price: holding.price,
          net: holding.net,
          day: holding.day,
        };
      }

      await user.save();

      const userSummary = await computeUserSummary(username);

      return res.status(200).json({
        message: "Sell order processed successfully!",
        updatedHolding, // may be null if doc deleted
        userSummary,
      });
    }

    // not allowed mode
    return res.status(400).json({ error: "Invalid order mode" });
  } catch (err) {
    console.error("❌ Error in /newOrder:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});









// ✅ User summary route
app.get("/user/:username/summary", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      balance: user.balance,
      equityValue: user.equityValue,
      totalPL: user.totalPL,
    });
  } catch (err) {
    console.error("❌ Error fetching user summary:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ MongoDB connection and server start
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URL || process.env.MONGO_URI || "mongodb://localhost:27017/tradenest";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });




// ✅ Imports
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import validator from "validator";

// import { authMiddleware } from "./middleware/authMiddleware.js";
// import { HoldingsModel } from "./model/HoldingsModel.js";
// import { PositionsModel } from "./model/PositionsModel.js";
// import { OrdersModel } from "./model/OrdersModel.js";
// import UserModel from "./model/UserModel.js";
// import learningRoutes from "./routes/learningRoutes.js";

// dotenv.config();
// const app = express();

// // ✅ JWT secret
// const JWT_SECRET = process.env.JWT_SECRET || "tradenestsecret";

// // ✅ Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(bodyParser.json());

// // ------------------------------
// // ✅ Auth: Signup Route
// // ------------------------------
// app.post("/api/auth/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password)
//       return res.status(400).json({ message: "All fields are required." });

//     if (!validator.isEmail(email))
//       return res.status(400).json({ message: "Invalid email format." });

//     const existing = await UserModel.findOne({ $or: [{ username }, { email }] });
//     if (existing)
//       return res.status(409).json({ message: "Username or email already taken." });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const newUser = new UserModel({ username, email, password: hashed });
//     await newUser.save();

//     const token = jwt.sign(
//       { id: newUser._id, username: newUser.username, email: newUser.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       message: "User created successfully.",
//       token,
//       user: { id: newUser._id, username: newUser.username, email: newUser.email },
//     });
//   } catch (err) {
//     console.error("❌ Signup error:", err);
//     res.status(500).json({ message: "Server error during signup." });
//   }
// });

// // ------------------------------
// // ✅ Auth: Login Route
// // ------------------------------
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required." });

//     const user = await UserModel.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User not found." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials." });

//     const token = jwt.sign(
//       { id: user._id, username: user.username, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login successful.",
//       token,
//       user: { id: user._id, username: user.username, email: user.email },
//     });
//   } catch (err) {
//     console.error("❌ Login error:", err);
//     res.status(500).json({ message: "Server error during login." });
//   }
// });

// // ------------------------------
// // ✅ Other Routes
// // ------------------------------
// app.use("/api/learning", learningRoutes);

// // ✅ Root route
// app.get("/", (req, res) => res.send("Backend running successfully 🚀"));
// app.get("/test", (req, res) => res.send("✅ Test route working!"));

// // ✅ Holdings route (User-specific)
// app.get("/allHoldings", authMiddleware, async (req, res) => {
//   try {
//     const username = req.user.username;
//     const holdings = await HoldingsModel.find({ username });
//     res.json(holdings);
//   } catch (err) {
//     console.error("Error fetching holdings:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Positions route (User-specific)
// app.get("/allPositions", authMiddleware, async (req, res) => {
//   try {
//     const username = req.user.username;
//     const positions = await PositionsModel.find({ username });
//     res.json(positions);
//   } catch (err) {
//     console.error("Error fetching positions:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ New Order route
// app.post("/newOrder", authMiddleware, async (req, res) => {
//   try {
//     const username = req.user.username;
//     const { name, qty, price, mode } = req.body;

//     if (!name || !qty || !price || !mode)
//       return res.status(400).json({ error: "Missing required fields" });

//     const user = await UserModel.findOne({ username });
//     if (!user)
//       return res.status(404).json({ error: "User not found" });

//     const newOrder = new OrdersModel({ name, qty, price, mode, username });
//     await newOrder.save();

//     let holding = await HoldingsModel.findOne({ username, name });

//     if (mode === "BUY") {
//       const totalCost = price * qty;
//       if (user.balance < totalCost)
//         return res.status(400).json({ error: "Insufficient balance" });

//     user.balance -= totalCost;

//     if (holding) {
//       const totalQty = holding.qty + qty;
//       const newAvg = (holding.avg * holding.qty + price * qty) / totalQty;
//       holding.qty = totalQty;
//       holding.avg = newAvg;
//     } else {
//       holding = new HoldingsModel({
//         username,
//         name,
//         qty,
//         avg: price,
//         price,
//         net: "+0",
//         day: "+0",
//       });
//     }

//     await holding.save();
//     await user.save();
//   }

//   if (mode === "SELL") {
//     if (!holding || holding.qty < qty)
//       return res.status(400).json({ error: "Not enough holdings to sell" });

//     user.balance += price * qty;
//     holding.qty -= qty;

//     if (holding.qty === 0) {
//       await HoldingsModel.deleteOne({ username, name });
//     } else {
//       await holding.save();
//     }

//     await user.save();
//   }

//   res.status(201).json({ message: "Order processed successfully!" });
//   } catch (err) {
//     console.error("❌ Error saving order:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ User summary route
// app.get("/user/:username/summary", async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ username: req.params.username });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json({
//       balance: user.balance,
//       equityValue: user.equityValue,
//       totalPL: user.totalPL,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching user summary:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ MongoDB connection and server start
// const PORT = process.env.PORT || 3002;
// const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/tradenest";

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully!");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });
