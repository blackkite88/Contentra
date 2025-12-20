import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  SquarePen,
  Hash,
  FileText,
  FileSearch,
  Wand2,
} from "lucide-react";

const features = [
  { name: "Article Writer", Icon: SquarePen, color: "from-blue-500 to-cyan-500" },
  { name: "Blog Titles", Icon: Hash, color: "from-purple-500 to-pink-500" },
  { name: "Resume Review", Icon: FileText, color: "from-emerald-500 to-teal-500" },
  { name: "Smart Summary", Icon: FileSearch, color: "from-amber-500 to-orange-500" },
  { name: "Rewrite Assistant", Icon: Wand2, color: "from-indigo-500 to-violet-500" },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:p-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      {/* Heading + Sub */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-pink-700">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our suite of premium AI tools.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition"
        >
          Start creating now
        </button>
      </div>

      {/* Trusted Section */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="users" className="h-8" />
        Trusted by 10k+ people
      </div>

      {/* FEATURES MARQUEE */}
      <div className="overflow-hidden mt-16 w-full flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...features, ...features].map(({ name, Icon, color }, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white shadow-sm border border-gray-100"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
