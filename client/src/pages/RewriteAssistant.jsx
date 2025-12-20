import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const tones = ["Professional", "Casual", "Friendly", "Marketing"];

const RewriteAssistant = () => {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/rewrite-assistant",
        { text, tone },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) setContent(data.content);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message || "Failed to rewrite content");
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
          <Sparkles className="w-6 text-[#6366F1]" />
          <h1 className="text-xl font-semibold">Rewrite Assistant</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Paste Content</p>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          placeholder="Paste content you want to rewrite..."
          required
        />

        <p className="mt-4 text-sm font-medium">Tone</p>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 mt-2 text-sm rounded-md border border-gray-300"
        >
          {tones.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-4 py-2 mt-6 text-sm rounded-lg"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin" />
          ) : (
            <Wand2 className="w-5" />
          )}
          Rewrite Content
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Wand2 className="w-5 h-5 text-[#6366F1]" />
          <h1 className="text-xl font-semibold">Rewritten Content</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Wand2 className="w-9 h-9" />
              <p>Paste content and click “Rewrite Content”</p>
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

export default RewriteAssistant;
