import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/dbConfig.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(helmet()); // Use Helmet middleware for enhanced security headers
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

// Routes
app.use("/api/category",categoryRoutes)

export default app;