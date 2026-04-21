import { useNavigate } from "react-router";
import { BarChart3, Zap } from "lucide-react";

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white opacity-5" />
      <div className="absolute top-[80px] left-[-40px] w-40 h-40 rounded-full bg-white opacity-5" />
      <div className="absolute bottom-[180px] right-[-30px] w-48 h-48 rounded-full bg-indigo-400 opacity-20" />
      <div className="absolute bottom-[-40px] left-[-50px] w-56 h-56 rounded-full bg-blue-300 opacity-15" />

      {/* Top content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-12">
        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-6">
          <div className="relative">
            <BarChart3 size={36} className="text-blue-600" strokeWidth={2.5} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center">
              <Zap size={8} className="text-white" />
            </div>
          </div>
        </div>

        {/* App name */}
        <h1 className="text-white mb-2" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5 }}>
          Blink<span className="text-blue-200">Iq</span>
        </h1>

        {/* Tagline */}
        <p className="text-blue-100 text-center mb-3" style={{ fontSize: 15, lineHeight: 1.6 }}>
          Track Smart. Predict Better. Sell More.
        </p>

        {/* Decorative chart illustration */}
        <div className="w-full max-w-xs mt-8 bg-white bg-opacity-10 rounded-3xl p-5 backdrop-blur-sm">
          <div className="flex items-end gap-2 justify-center" style={{ height: 80 }}>
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg bg-white opacity-70"
                style={{ height: `${h}%`, minWidth: 0 }} />
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="text-blue-100 text-center flex-1" style={{ fontSize: 9 }}>{d}</span>
            ))}
          </div>
          <p className="text-white text-center mt-2 text-xs opacity-80">Weekly Sales Overview</p>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-6">
          {[
            { label: "Stores", value: "2.4K+" },
            { label: "Products", value: "50K+" },
            { label: "Accuracy", value: "94%" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-white font-bold text-lg">{value}</span>
              <span className="text-blue-200 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-8 flex flex-col gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-white text-blue-600 py-4 rounded-2xl font-bold text-base shadow-lg active:scale-95 transition-transform"
          style={{ fontSize: 15 }}
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-white bg-opacity-15 border border-white border-opacity-30 text-white py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform"
          style={{ fontSize: 15 }}
        >
          Login
        </button>
      </div>
    </div>
  );
}