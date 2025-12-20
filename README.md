<div align="center">

# CONTENTRA ✨

AI-Powered Writing & Productivity Platform

![Last Commit](https://img.shields.io/github/last-commit/your-username/contentra?style=flat-square)
![Languages](https://img.shields.io/github/languages/top/your-username/contentra?style=flat-square\&color=blue)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-success?style=flat-square)

*Built with modern AI & web technologies*

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square\&logo=mongodb\&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF4F00?style=flat-square)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square\&logo=clerk\&logoColor=white)

</div>

---

## Overview

**Contentra** is a modern AI-powered platform focused on **writing, refining, and improving text content**.

It provides fast, reliable AI tools for creators, students, and professionals — all in one clean dashboard.

---

## Key Features

### ✍️ Writing & Text Tools

* **AI Article Writer**
  Generate structured, high-quality articles on any topic.

* **Blog Title Generator**
  Create catchy, SEO-friendly blog titles instantly.

* **Resume Reviewer**
  Get clear, constructive feedback on resumes to improve job prospects.

* **Smart Summary**
  Condense long text into concise, meaningful summaries.

* **Rewrite Assistant**
  Rewrite or rephrase content to improve clarity and tone.

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router
* Lucide Icons
* React Markdown
* Clerk Authentication

### Backend

* Node.js
* Express
* MongoDB (Atlas / Local)
* Groq API (LLaMA models)

### Dev & Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas
* Clerk

---

## Architecture

contentra/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── server.js

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm or pnpm
* MongoDB (local or Atlas)
* Groq API key
* Clerk account

---

### Installation

git clone [https://github.com/your-username/contentra.git](https://github.com/your-username/contentra.git)
cd contentra

#### Frontend

cd client
npm install
npm run dev

#### Backend

cd server
npm install
npm start

---

## Environment Variables

### Client (`client/.env`)

VITE_BASE_URL=[http://localhost:3000](http://localhost:3000)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx

### Server (`server/.env`)

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/contentra
CLERK_SECRET_KEY=sk_test_xxx
GROQ_API_KEY=gsk_xxx

---

## API Endpoints

### AI Routes (`/api/ai`)

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/generate-article`    | Generate AI articles |
| POST   | `/generate-blog-title` | Generate blog titles |
| POST   | `/resume-review`       | Review resume text   |
| POST   | `/smart-summary`       | Summarize content    |
| POST   | `/rewrite-text`        | Rewrite text         |

---

## Deployment

### Frontend

* Vercel
* Build command: `npm run build`
* Output: `dist`

### Backend

* Render
* Start command: `npm start`
* Add all environment variables in Render dashboard

---

## Performance

* ⚡ Fast inference via Groq
* 🧠 Stateless AI requests
* 📦 Optimized frontend bundle
* 🔐 Secure auth with Clerk

---

## License

This project is licensed under the **ISC License**.

---

<div align="center">

**Contentra** — Write smarter, faster, and better with AI ✨

[⬆ Back to Top](#overview)

</div>
# Contentra
# Contentra
# Contentra
# Contentra
# Contentra
