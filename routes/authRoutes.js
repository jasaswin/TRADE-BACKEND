

// backend/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { signup } = require('../controllers/authController');

// router.post('/signup', signup);

// module.exports = router;




import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_for_prod";

// -----------------------
// USER LOGIN
// -----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    // find user
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found." });

    // check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Incorrect password." });

    // create token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
