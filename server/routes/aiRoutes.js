import express from "express";
import { requireAuth } from "@clerk/express";
import {
  generateArticle,
  generateBlogTitle,
  resumeReview,
  smartSummary,
  rewriteAssistant,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

/* =======================
   AI Tools Routes
======================= */

// 1️⃣ AI Article Writer
aiRouter.post("/generate-article", requireAuth(), generateArticle);

// 2️⃣ Blog Title Generator
aiRouter.post("/generate-blog-title", requireAuth(), generateBlogTitle);

// 3️⃣ Resume Reviewer
aiRouter.post("/resume-review", requireAuth(), resumeReview);

// 4️⃣ Smart Summary
aiRouter.post("/smart-summary", requireAuth(), smartSummary);

// 5️⃣ Rewrite Assistant
aiRouter.post("/rewrite-assistant", requireAuth(), rewriteAssistant);

export default aiRouter;
