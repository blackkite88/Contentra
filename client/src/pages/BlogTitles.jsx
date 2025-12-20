import { useState } from "react";
import { Hash, Sparkles } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input) return;

    try {
      setLoading(true);

      const prompt = `Generate a blog title for the keyword "${input}" in the category "${selectedCategory}"`;

      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to generate title");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Blog Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Artificial Intelligence"
          className="w-full p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 outline-none"
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {blogCategories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full ${
                selectedCategory === item
                  ? "bg-purple-50 text-purple-700 border-purple-300"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 text-sm rounded-lg"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" />
          ) : (
            <Hash className="w-5" />
          )}
          Generate title
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center text-gray-400 text-sm mt-10">
            Enter a keyword and generate a title
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600 reset-tw">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
