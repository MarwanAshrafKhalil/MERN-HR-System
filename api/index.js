import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import CredentialsRoutes from "./routes/Credentials.route.js";
import employeeRoutes from "./routes/Employee.route.js";
import authRoutes from "./routes/auth.route.js";
import punchRoutes from "./routes/punch.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/employee", employeeRoutes);
app.use("/api/credentials", CredentialsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/punch", punchRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
