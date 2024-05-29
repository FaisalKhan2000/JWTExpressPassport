import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";

import { strategy } from "./config/passport.js";

// routers
import authRouter from "./routes/authRoutes.js";

// middleware
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
app.use(express.json());
app.use(cookieParser());

// passport initialize
passport.use(strategy);
app.use(passport.initialize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello, express");
});

app.use("/api/v1/auth", authRouter);

// Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
