import logo from "./logo.png";
import gradientBackground from "./gradientBackground.png";
import user_group from "./user_group.png";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import profile_img_1 from "./profile_img_1.png";
import arrow_icon from "./arrow_icon.svg";

import {
  SquarePen,
  Hash,
  FileText,
  FileSearch,
  Wand2,
} from "lucide-react";

// Company logos
import facebook from "./facebook.svg";
import slack from "./slack.svg";
import framer from "./framer.svg";
import netflix from "./netflix.svg";
import google from "./google.svg";
import linkedin from "./linkedin.svg";
import instagram from "./instagram.svg";

/* =======================
   Assets
======================= */

export const assets = {
  logo,
  gradientBackground,
  user_group,
  star_icon,
  star_dull_icon,
  profile_img_1,
  arrow_icon,
  facebook,
  slack,
  framer,
  netflix,
  google,
  linkedin,
  instagram,
};

/* =======================
   AI Tools (MATCH BACKEND)
======================= */

export const AiToolsData = [
  {
    title: "AI Article Writer",
    description:
      "Generate high-quality, engaging articles on any topic with AI.",
    Icon: SquarePen,
    bg: { from: "#3588F2", to: "#0BB0D7" },
    path: "/ai/write-article",
  },
  {
    title: "Blog Title Generator",
    description:
      "Create catchy and SEO-friendly blog titles instantly.",
    Icon: Hash,
    bg: { from: "#B153EA", to: "#E549A3" },
    path: "/ai/blog-titles",
  },
  {
    title: "Resume Reviewer",
    description:
      "Get your resume reviewed by AI to improve job prospects.",
    Icon: FileText,
    bg: { from: "#12B7AC", to: "#08B6CE" },
    path: "/ai/review-resume",
  },
  {
    title: "Smart Summary",
    description:
      "Extract key points and insights from long content in seconds.",
    Icon: FileSearch,
    bg: { from: "#F59E0B", to: "#F97316" },
    path: "/ai/smart-summary",
  },
  {
    title: "Rewrite Assistant",
    description:
      "Rewrite and enhance your content with better clarity and tone.",
    Icon: Wand2,
    bg: { from: "#6366F1", to: "#8B5CF6" },
    path: "/ai/rewrite-assistant",
  },
];

/* =======================
   Testimonials
======================= */

export const dummyTestimonialData = [
  {
    image: assets.profile_img_1,
    name: "John Doe",
    title: "Marketing Director",
    content:
      "Contentra has transformed how we create content. Fast, reliable, and high-quality.",
    rating: 4,
  },
  {
    image: assets.profile_img_1,
    name: "Jane Smith",
    title: "Content Creator",
    content:
      "The article and title generators save me hours every week.",
    rating: 5,
  },
];

/* =======================
   Dummy Creations (TEXT ONLY)
======================= */

export const dummyCreationData = [
  {
    _id: "1",
    userId: "user_demo",
    prompt: "Write an article about AI in healthcare",
    content: "AI is transforming healthcare by improving diagnostics...",
    type: "article",
    publish: false,
    likes: [],
    createdAt: new Date(),
  },
  {
    _id: "2",
    userId: "user_demo",
    prompt: "Generate blog titles for AI startups",
    content: "Top 10 AI Startup Ideas in 2025",
    type: "blog-title",
    publish: false,
    likes: [],
    createdAt: new Date(),
  },
  {
    _id: "3",
    userId: "user_demo",
    prompt: "Summarize an AI research paper",
    content: "This paper discusses recent advances in AI...",
    type: "summary",
    publish: false,
    likes: [],
    createdAt: new Date(),
  },
  {
    _id: "4",
    userId: "user_demo",
    prompt: "Rewrite a product description",
    content: "This product offers improved performance and reliability...",
    type: "rewrite",
    publish: false,
    likes: [],
    createdAt: new Date(),
  },
];
