import Groq from "groq-sdk";
import { MongoClient } from "mongodb";
import fs from "fs";
import pdf from "pdf-parse";

/* =======================
   MongoDB (SAFE)
======================= */

let db;
const connectDB = async () => {
  if (db) return db;

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db();

  console.log("✅ MongoDB connected");
  return db;
};

/* =======================
   Groq Setup
======================= */

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =======================
   Helpers
======================= */

const getUserIdSafe = (req) => {
  try {
    return req.auth?.()?.userId || null;
  } catch {
    return null;
  }
};

const generateWithGroq = async (prompt, temperature = 0.6) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature,
  });

  return completion.choices[0]?.message?.content;
};

/* =======================
   1️⃣ AI Article Writer
======================= */

export const generateArticle = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const content = await generateWithGroq(prompt, 0.7);

    res.json({ success: true, content });
  } catch (error) {
    console.error("Article error:", error);
    res.status(500).json({
      success: false,
      message: "Groq generation failed",
    });
  }
};

/* =======================
   2️⃣ Blog Title Generator
======================= */

export const generateBlogTitle = async (req, res) => {
  try {
    const userId = getUserIdSafe(req);
    const { prompt } = req.body || {};

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!prompt)
      return res.status(400).json({ success: false, message: "Prompt required" });

    const content = await generateWithGroq(prompt, 0.6);

    const db = await connectDB();
    await db.collection("creations").insertOne({
      userId,
      prompt,
      content,
      type: "blog-title",
      createdAt: new Date(),
    });

    res.json({ success: true, content });
  } catch (error) {
    console.error("Blog title error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate blog titles",
    });
  }
};

/* =======================
   3️⃣ Resume Reviewer (PDF UPLOAD)
======================= */

export const resumeReview = async (req, res) => {
  try {
    const userId = getUserIdSafe(req);

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    // Read and parse PDF
    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(buffer);
    const resumeText = pdfData.text;

    // Remove temp file
    fs.unlinkSync(req.file.path);

    const prompt = `
Review the following resume and provide:
- Strengths
- Weaknesses
- Clear improvement suggestions

Resume:
${resumeText}
`;

    const content = await generateWithGroq(prompt, 0.5);

    const db = await connectDB();
    await db.collection("creations").insertOne({
      userId,
      prompt: "Resume Review",
      content,
      type: "resume-review",
      createdAt: new Date(),
    });

    res.json({ success: true, content });
  } catch (error) {
    console.error("Resume error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to review resume",
    });
  }
};

/* =======================
   4️⃣ Smart Summary
======================= */

export const smartSummary = async (req, res) => {
  try {
    const userId = getUserIdSafe(req);
    const { text } = req.body || {};

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!text)
      return res.status(400).json({ success: false, message: "Text required" });

    const prompt = `
Summarize the content below clearly and concisely.
Focus on key points.

Content:
${text}
`;

    const content = await generateWithGroq(prompt, 0.4);

    const db = await connectDB();
    await db.collection("creations").insertOne({
      userId,
      prompt: "Smart Summary",
      content,
      type: "summary",
      createdAt: new Date(),
    });

    res.json({ success: true, content });
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to summarize content",
    });
  }
};

/* =======================
   5️⃣ Rewrite Assistant
======================= */

export const rewriteAssistant = async (req, res) => {
  try {
    const userId = getUserIdSafe(req);
    const { text, tone = "Professional" } = req.body || {};

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!text)
      return res.status(400).json({ success: false, message: "Text required" });

    const prompt = `
Rewrite the content below to improve clarity and flow.
Keep meaning unchanged.
Tone: ${tone}

Content:
${text}
`;

    const content = await generateWithGroq(prompt, 0.5);

    const db = await connectDB();
    await db.collection("creations").insertOne({
      userId,
      prompt: "Rewrite Assistant",
      content,
      type: "rewrite",
      createdAt: new Date(),
    });

    res.json({ success: true, content });
  } catch (error) {
    console.error("Rewrite error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to rewrite content",
    });
  }
};
