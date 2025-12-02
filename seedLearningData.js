
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Lesson from "./model/LessonModel.js";
// import Quiz from "./model/QuizModel.js";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;

// const seedData = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected to MongoDB");

//     await Lesson.deleteMany();
//     await Quiz.deleteMany();

//     const lessons = await Lesson.insertMany([
//       {
//         title: "Introduction to Trading",
//         description: "Learn the basics of stock trading, types of orders, and market participants.",
//         content: "Trading is the act of buying and selling stocks for profit...",
//       },
//       {
//         title: "Understanding Stock Charts",
//         description: "Learn how to read candlestick charts, trends, and indicators.",
//         content: "Charts are visual tools that help traders understand price movements...",
//       },
//     ]);

//     const quizzes = await Quiz.insertMany([
//       {
//         lessonId: lessons[0]._id,
//         question: "What is trading?",
//         options: ["Buying and selling goods", "Buying and selling stocks", "Saving money", "Investing in gold"],
//         answer: "Buying and selling stocks",
//       },
//       {
//         lessonId: lessons[1]._id,
//         question: "What does a candlestick chart show?",
//         options: ["Volume only", "Price movement", "Company profits", "Dividends"],
//         answer: "Price movement",
//       },
//     ]);

//     console.log("✅ Sample Lessons and Quizzes added!");
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// seedData();


// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { LessonModel } from "./model/LessonModel.js";
// import { QuizModel } from "./model/QuizModel.js";

// dotenv.config(); // ✅ loads .env

// const MONGO_URL = process.env.MONGO_URL;

// if (!MONGO_URL) {
//   console.error("❌ MONGO_URL not found in .env file");
//   process.exit(1);
// }

// async function seedData() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("✅ Connected to MongoDB");

//     await Lesson.deleteMany({});
//     await Quiz.deleteMany({});

//     const lesson1 = await Lesson.create({
//       title: "Introduction to Trading",
//       description: "Learn the basics of stock trading, markets, and orders.",
//       content: "Trading involves buying and selling assets like stocks...",
//     });

//     await Quiz.create({
//       lessonId: lesson1._id,
//       question: "What is trading?",
//       options: [
//         "Buying and selling of assets",
//         "Only buying stocks",
//         "Only selling stocks",
//         "None of these",
//       ],
//       answer: "Buying and selling of assets",
//     });

//     console.log("✅ Sample Lessons and Quizzes added!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("❌ Error seeding data:", error);
//   }
// }

// seedData();


// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { LessonModel } from "./model/LessonModel.js";
// import { QuizModel } from "./model/QuizModel.js";

// dotenv.config(); // ✅ Load environment variables

// const MONGO_URL = process.env.MONGO_URL;

// if (!MONGO_URL) {
//   console.error("❌ MONGO_URL not found in .env file");
//   process.exit(1);
// }

// async function seedData() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("✅ Connected to MongoDB");

//     // Clear existing data
//     await LessonModel.deleteMany({});
//     await QuizModel.deleteMany({});

//     // Add sample lesson
//     const lesson1 = await LessonModel.create({
//       title: "Introduction to Trading",
//       description: "Learn the basics of stock trading, markets, and orders.",
//       content: "Trading involves buying and selling assets like stocks...",
//     });

//     // Add sample quiz linked to that lesson
//     await QuizModel.create({
//       lessonId: lesson1._id,
//       question: "What is trading?",
//       options: [
//         "Buying and selling of assets",
//         "Only buying stocks",
//         "Only selling stocks",
//         "None of these",
//       ],
//       answer: "Buying and selling of assets",
//     });

//     console.log("✅ Sample Lessons and Quizzes added!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("❌ Error seeding data:", error);
//   }
// }

// seedData();


// backend/seedLearningData.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Lesson from "./model/LessonModel.js";
// import Quiz from "./model/QuizModel.js";

// dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;

// if (!MONGO_URL) {
//   console.error("❌ MONGO_URL not found in .env file");
//   process.exit(1);
// }

// async function seedData() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("✅ Connected to MongoDB");

//     // clear collections
//     await Lesson.deleteMany({});
//     await Quiz.deleteMany({});

//     // add sample lesson
//     const lesson1 = await Lesson.create({
//       title: "Introduction to Trading",
//       description: "Learn the basics of stock trading, markets, and orders.",
//       content: "Trading involves buying and selling assets like stocks...",
//     });

//     // add sample quiz
//     await Quiz.create({
//       lessonId: lesson1._id,
//       question: "What is trading?",
//       options: [
//         "Buying and selling of assets",
//         "Only buying stocks",
//         "Only selling stocks",
//         "None of these",
//       ],
//       answer: "Buying and selling of assets",
//     });

//     console.log("✅ Sample Lessons and Quizzes added!");
//     await mongoose.connection.close();
//   } catch (error) {
//     console.error("❌ Error seeding data:", error);
//   }
// }

// seedData();


// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { LessonModel } from "./model/LessonModel.js";
// import { QuizModel } from "./model/QuizModel.js";

// // Load environment variables
// dotenv.config();

// async function seedData() {
//   try {
//     // Connect to MongoDB using the URL from .env
//     const mongoURL = process.env.MONGO_URL;
//     if (!mongoURL) {
//       throw new Error("❌ MONGO_URL not found in .env file");
//     }

//     await mongoose.connect(mongoURL);
//     console.log("✅ Connected to MongoDB");

//     // Optional: clear existing data to avoid duplicates
//     await LessonModel.deleteMany({});
//     await QuizModel.deleteMany({});

//     // Insert lessons
//     const lessons = await LessonModel.insertMany([
//       {
//         title: "Introduction to Stock Market",
//         description: "Learn how stocks and IPOs work.",
//         content:
//           "What is a stock, how IPOs work, and what moves stock prices.",
//       },
//       {
//         title: "Basic Terms & Ratios",
//         description: "Understand PE ratio, market cap, and trends.",
//         content:
//           "Learn about PE Ratio, Market Cap, Volume, and Bullish/Bearish markets.",
//       },
//       {
//         title: "How to Read Charts",
//         description: "Basics of candlesticks, support, and resistance.",
//         content:
//           "Candlestick colors, support/resistance basics, and volume indicators.",
//       },
//       {
//         title: "Trading Risks & Safety Tips",
//         description: "Protect yourself with stop-loss and diversification.",
//         content:
//           "Risk management, avoiding tips, and diversification basics.",
//       },
//       {
//         title: "First Steps as a Beginner Trader",
//         description: "Learn your first trading actions.",
//         content:
//           "Opening demat account, paper trading, small start, journaling trades.",
//       },
//     ]);

//     // Insert quizzes
//     await QuizModel.insertMany([
//       {
//         lessonId: lessons[0]._id,
//         question: "A stock represents:",
//         options: [
//           "A company’s debt",
//           "Ownership in a company",
//           "A loan",
//         ],
//         correctAnswer: "Ownership in a company",
//       },
//       {
//         lessonId: lessons[1]._id,
//         question: "If PE is very high, does it mean:",
//         options: [
//           "Stock is undervalued",
//           "Stock may be overvalued",
//           "Stock is cheap",
//         ],
//         correctAnswer: "Stock may be overvalued",
//       },
//       {
//         lessonId: lessons[2]._id,
//         question: "If the candlestick is red, does it mean:",
//         options: [
//           "Price went up",
//           "Price went down",
//           "Price stayed same",
//         ],
//         correctAnswer: "Price went down",
//       },
//       {
//         lessonId: lessons[3]._id,
//         question: "If you put all money in one stock, risk is:",
//         options: ["High", "Low", "No risk"],
//         correctAnswer: "High",
//       },
//     ]);

//     console.log("✅ Lessons and quizzes inserted successfully!");
//   } catch (error) {
//     console.error("❌ Error inserting data:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedData();


import mongoose from "mongoose";
import dotenv from "dotenv";
import { LessonModel } from "./model/LessonModel.js";
import { QuizModel } from "./model/QuizModel.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const seedLearningData = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected");

    await Lesson.deleteMany();
    console.log("🧹 Old lessons cleared");

    const lessons = [
      // 📘 1. Introduction to Stock Market
      {
        title: "Introduction to Stock Market",
        description: "Learn what stocks are, how IPOs work, and why prices change.",
        content:
          "Understand the basics of stock markets — what stocks represent, how companies raise money through IPOs, and what drives stock price movements.",
        quizzes: [
          {
            question: "A stock represents:",
            options: [
              "A company’s debt",
              "Ownership in a company",
              "A loan",
            ],
            correctAnswer: "Ownership in a company",
          },
          {
            question: "What is an IPO?",
            options: [
              "Initial Private Offering",
              "Initial Public Offering",
              "International Price Order",
            ],
            correctAnswer: "Initial Public Offering",
          },
          {
            question: "Why do stock prices go up and down?",
            options: [
              "Because of company profits and market demand",
              "Because they are fixed by the government",
              "Because of taxes only",
            ],
            correctAnswer: "Because of company profits and market demand",
          },
          {
            question: "When you buy a share, you become:",
            options: [
              "A company’s lender",
              "A company’s owner",
              "A company’s customer",
            ],
            correctAnswer: "A company’s owner",
          },
          {
            question: "Stock market is also known as:",
            options: [
              "Capital market",
              "Money market",
              "Insurance market",
            ],
            correctAnswer: "Capital market",
          },
        ],
      },

      // 📘 2. Basic Terms & Ratios
      {
        title: "Basic Terms & Ratios",
        description: "Learn PE ratio, market cap, volume, and bullish vs bearish terms.",
        content:
          "Understand essential stock market terms such as PE ratio, market capitalization, trading volume, and investor sentiments like bullish and bearish.",
        quizzes: [
          {
            question: "If PE ratio is very high, it usually means:",
            options: [
              "Stock is undervalued",
              "Stock may be overvalued",
              "Stock is cheap",
            ],
            correctAnswer: "Stock may be overvalued",
          },
          {
            question: "Market Cap means:",
            options: [
              "Total revenue of the company",
              "Total value of all outstanding shares",
              "Total profit of the company",
            ],
            correctAnswer: "Total value of all outstanding shares",
          },
          {
            question: "Bullish means:",
            options: [
              "Expecting prices to rise",
              "Expecting prices to fall",
              "Neutral about prices",
            ],
            correctAnswer: "Expecting prices to rise",
          },
          {
            question: "Dividend means:",
            options: [
              "Company profit shared with shareholders",
              "Company’s loan repayment",
              "Tax paid to government",
            ],
            correctAnswer: "Company profit shared with shareholders",
          },
          {
            question: "Volume in stock market refers to:",
            options: [
              "Number of shares traded in a period",
              "Total market capitalization",
              "Stock’s face value",
            ],
            correctAnswer: "Number of shares traded in a period",
          },
        ],
      },

      // 📘 3. How to Read Charts
      {
        title: "How to Read Charts",
        description: "Learn about candlestick charts, support & resistance, and volume indicators.",
        content:
          "Candlestick charts show price movements. Learn about green/red candles, support/resistance levels, and how to use volume indicators to analyze trends.",
        quizzes: [
          {
            question: "If a candlestick is red, it means:",
            options: [
              "Price went up",
              "Price went down",
              "Price stayed the same",
            ],
            correctAnswer: "Price went down",
          },
          {
            question: "Support level is:",
            options: [
              "A level where price tends to stop falling",
              "A level where price tends to stop rising",
              "A random price point",
            ],
            correctAnswer: "A level where price tends to stop falling",
          },
          {
            question: "Resistance level is:",
            options: [
              "A level where price tends to stop rising",
              "A level where price tends to stop falling",
              "A price ceiling that breaks easily",
            ],
            correctAnswer: "A level where price tends to stop rising",
          },
          {
            question: "Green candlestick means:",
            options: [
              "Price closed higher than it opened",
              "Price closed lower than it opened",
              "No price movement",
            ],
            correctAnswer: "Price closed higher than it opened",
          },
          {
            question: "Volume indicator helps to understand:",
            options: [
              "How many shares are traded",
              "Company profit",
              "Dividend payout",
            ],
            correctAnswer: "How many shares are traded",
          },
        ],
      },

      // 📘 4. Trading Risks & Safety Tips
      {
        title: "Trading Risks & Safety Tips",
        description: "Learn how to trade safely using stop-loss and diversification.",
        content:
          "Understand common trading risks and learn safe practices such as setting stop-loss orders, avoiding random tips, and diversifying your portfolio.",
        quizzes: [
          {
            question: "If you put all your money in one stock, risk is:",
            options: ["High", "Low", "No risk"],
            correctAnswer: "High",
          },
          {
            question: "Stop-loss means:",
            options: [
              "Automatically selling a stock when it falls below a set price",
              "Automatically buying at low prices",
              "Locking profit manually",
            ],
            correctAnswer:
              "Automatically selling a stock when it falls below a set price",
          },
          {
            question: "Diversification helps to:",
            options: [
              "Increase risk",
              "Reduce risk",
              "Have no effect on risk",
            ],
            correctAnswer: "Reduce risk",
          },
          {
            question: "You should never invest money you:",
            options: [
              "Can’t afford to lose",
              "Have borrowed",
              "Don’t have",
            ],
            correctAnswer: "Can’t afford to lose",
          },
          {
            question: "Following random stock tips can lead to:",
            options: [
              "Better accuracy",
              "Huge losses",
              "Guaranteed profits",
            ],
            correctAnswer: "Huge losses",
          },
        ],
      },

      // 📘 5. First Steps as a Beginner Trader
      {
        title: "First Steps as a Beginner Trader",
        description: "Learn how to start your trading journey the right way.",
        content:
          "Know how to open a demat account, practice paper trading, start small, and track your trades effectively.",
        quizzes: [
          {
            question: "What is a Demat account?",
            options: [
              "An account to hold shares electronically",
              "A savings account",
              "An account to borrow money",
            ],
            correctAnswer: "An account to hold shares electronically",
          },
          {
            question: "Paper trading means:",
            options: [
              "Practicing trading without real money",
              "Trading only paper companies",
              "Printing stock certificates",
            ],
            correctAnswer: "Practicing trading without real money",
          },
          {
            question: "As a beginner, you should invest:",
            options: [
              "All your savings",
              "Small amounts to learn",
              "Borrowed funds",
            ],
            correctAnswer: "Small amounts to learn",
          },
          {
            question: "A trading journal helps you to:",
            options: [
              "Track and improve your performance",
              "Spend more money",
              "Avoid taxes",
            ],
            correctAnswer: "Track and improve your performance",
          },
          {
            question: "Before trading live, it’s best to:",
            options: [
              "Practice with virtual money",
              "Trade based on tips",
              "Buy randomly",
            ],
            correctAnswer: "Practice with virtual money",
          },
        ],
      },
    ];

    await Lesson.insertMany(lessons);
    console.log("🌱 Stock Market Lessons and Quizzes inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedLearningData();
