import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./configs/db.js";

const app = express();

// middlewares
app.use(cors({
  origin: 'https://contentra-psi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  
}));
app.options('*', cors());
app.use(express.json());
app.use(clerkMiddleware());

// public route
app.get("/", (req, res) => res.send("Server is Live!"));

// protected routes
app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", backend: true });
});

// ✅ Connect to DB once, then export
connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err);
});

// ✅ Export for Vercel (no app.listen!)
export default app;
