import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import emailRoutes from "./routes/email";

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: "your_secret_key", resave: false, saveUninitialized: true }));

// Google Authentication (configure passport)
require("./utils/passport")(passport, prisma);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
