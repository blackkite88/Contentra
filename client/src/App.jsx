import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import ReviewResume from "./pages/ReviewResume";
import SmartSummary from "./pages/SmartSummary";
import RewriteAssistant from "./pages/RewriteAssistant";
import Community from "./pages/Community";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="/ai/smart-summary" element={<SmartSummary />} />
          <Route path="/ai/rewrite-assistant" element={<RewriteAssistant />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
