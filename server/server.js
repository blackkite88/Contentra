import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./configs/db.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://contentra-psi.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// middlewares
app.use(cors(corsOptions));
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

// start server ONLY after DB connects
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} => http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
