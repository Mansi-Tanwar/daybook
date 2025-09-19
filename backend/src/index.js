const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://daybook-personal-diary.vercel.app/", credentials: true }));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

const connectDB = require("./config/database");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Database connected successfully!`);
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("Database not connected! " + error);
  });
