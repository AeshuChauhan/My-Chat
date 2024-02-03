import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
app.use(express.json());

// Routes Configuration
import authRoutes from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRoutes)


export default app;
