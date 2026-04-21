import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, BarChart3, Zap } from "lucide-react";

export function LoginScreen() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-5 pt-4 pb-10 relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full bg-blue-400 opacity-20" />
        <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-6">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
            <div className="relative">
              <BarChart3 size={20} className="text-blue-600" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full" />
            </div>
          </div>
          <span className="text-white font-extrabold text-xl">BlinkIq</span>
        </div>
        <h2 className="text-white mt-3" style={{ fontSize: 24, fontWeight: 700 }}>Welcome back 👋</h2>
        <p className="text-blue-100 text-sm mt-1">Sign in to your account</p>
      </div>

      {/* Form card */}
      <div className="flex-1 px-5 -mt-5 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
          {/* Username */}
          <div className="mb-4">
            <label className="text-slate-600 text-sm font-semibold mb-2 block">Username / Email</label>
            <div className="flex items-center border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus-within:border-blue-400 transition-colors">
              <Mail size={18} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-800 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="text-slate-600 text-sm font-semibold mb-2 block">Password</label>
            <div className="flex items-center border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus-within:border-blue-400 transition-colors">
              <Lock size={18} className="text-slate-400 mr-3 shrink-0" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-800 text-sm"
              />
              <button onClick={() => setShowPass(!showPass)} className="ml-2">
                {showPass ? <EyeOff size={18} className="text-slate-400" /> : <Eye size={18} className="text-slate-400" />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right mb-6">
            <span className="text-blue-500 text-sm font-medium">Forgot Password?</span>
          </div>

          {/* Login button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg active:scale-95 transition-transform"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-slate-400 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            {["Google", "Apple"].map((provider) => (
              <button key={provider} className="flex-1 border-2 border-slate-100 rounded-2xl py-3 flex items-center justify-center gap-2 bg-white">
                <span className="text-slate-600 text-sm font-semibold">{provider}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sign up prompt */}
        <p className="text-center mt-5 text-slate-500 text-sm">
          Don't have an account?{" "}
          <span className="text-blue-600 font-semibold">Sign Up</span>
        </p>
      </div>
    </div>
  );
}