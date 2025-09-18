const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
require("dotenv").config(); 

const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://daybook-frontend.vercel.app', credentials: true }));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

let isConnected = false; 

const connectDB =  async() => {
  if(!isConnected) return;
    try {
      const db = await mongoose.connect(process.env.MONGO_URI);
      
      isConnected = db.connections[0].readyState === 1;
      console.log("Database connected successfully!")

    } catch (error) {
      console.log("Database connection failed!" + error);
    } 
};

connectDB(); 

// connectDB()
//   .then(() => {
//     console.log("Database connected successfully!");
//     // app.listen(process.env.PORT, () => {
//     //   console.log(`Server is running on port ${process.env.PORT}!`);
//     // });
//   })
//   .catch((error) => {
//     console.log("Database not connected! " + error);
//   });

module.exports = serverless(app);