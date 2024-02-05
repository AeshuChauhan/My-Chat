// Accessibility : Access Dot ENV files
import dotenv from 'dotenv';
dotenv.config();

// Accessibility : Access routes and json files
import express from 'express';
const app = express();
app.use(express.json());

// Accessibility : Access cookies files
import cookieParser from 'cookie-parser';
app.use(cookieParser());


// Routes Configuration
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import usersRoutes from "./routes/users.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/users", usersRoutes);


export default app;
