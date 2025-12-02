
// // backend/middleware/auth.js
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization || '';
//   const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload; // id & email
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };



// backend/middleware/authMiddleware.js
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "tradenestsecret";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Attach user info to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };



// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "tradenestsecret";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // attach user info (id, username, email)
//     next();
//   } catch (err) {
//     console.error("Invalid token:", err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };




// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "tradenestsecret";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("Invalid token:", err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };



import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_for_prod";


export const authMiddleware = (req, res, next) => {
const authHeader = req.headers.authorization || req.headers.Authorization;


if (!authHeader || typeof authHeader !== "string") {
return res.status(401).json({ message: "No token provided" });
}


const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;


try {
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
next();
} catch (err) {
console.error("Invalid token:", err);
return res.status(401).json({ message: "Invalid token" });
}
};