import { useState } from "react";
import { FileSearch, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const SmartSummary = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/smart-summary",
        { text },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) setContent(data.content);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message || "Failed to summarize content");
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#F59E0B]" />
          <h1 className="text-xl font-semibold">Smart Summary</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Paste Content</p>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          placeholder="Paste content you want to summarize..."
          required
        />

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white px-4 py-2 mt-6 text-sm rounded-lg"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin" />
          ) : (
            <FileSearch className="w-5" />
          )}
          Generate Summary
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileSearch className="w-5 h-5 text-[#F59E0B]" />
          <h1 className="text-xl font-semibold">Summary</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileSearch className="w-9 h-9" />
              <p>Paste content and click “Generate Summary”</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll">
            <div className="prose prose-sm max-w-none text-slate-600">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSummary;
