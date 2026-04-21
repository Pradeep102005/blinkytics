import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Store, Bell, Shield, LogOut, ChevronRight, Check } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

export function ProfileScreen() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("pradeep");
  const [username, setUsername] = useState("pvspradeep");
  const [email] = useState("devxpradeep@gmail.com");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header / Avatar */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-5 pt-4 pb-10 relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white opacity-5" />
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <ArrowLeft size={18} className="text-white" />
            </button>
            <h1 className="text-white font-bold text-base">My Profile</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center border-2 border-white border-opacity-30 shadow-lg">
              <span className="text-white font-black text-2xl">PR</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">{fullName}</p>
              <p className="text-blue-200 text-xs">@{username}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="bg-emerald-400 bg-opacity-30 text-emerald-200 text-xs px-2 py-0.5 rounded-lg font-medium">Store Admin</span>
                <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-0.5 rounded-lg font-medium">Pro Plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <div className="px-5 -mt-5 space-y-4">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
            <h3 className="text-slate-800 font-bold text-sm mb-4 flex items-center gap-2">
              <User size={15} className="text-blue-600" />
              Personal Information
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-slate-500 text-xs font-semibold block mb-1.5">Full Name</label>
                <div className="flex items-center bg-slate-50 rounded-xl px-3 py-3 border-2 border-slate-100 focus-within:border-blue-300 transition-colors">
                  <User size={15} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-slate-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-xs font-semibold block mb-1.5">Username</label>
                <div className="flex items-center bg-slate-50 rounded-xl px-3 py-3 border-2 border-slate-100 focus-within:border-blue-300 transition-colors">
                  <span className="text-slate-400 text-sm mr-1">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-slate-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-xs font-semibold block mb-1.5">Email Address</label>
                <div className="flex items-center bg-slate-100 rounded-xl px-3 py-3 border-2 border-transparent">
                  <Mail size={15} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="flex-1 bg-transparent outline-none text-slate-500 text-sm cursor-not-allowed"
                  />
                  <span className="text-xs text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="text-slate-800 font-bold text-sm mb-4 flex items-center gap-2">
              <Lock size={15} className="text-blue-600" />
              Change Password
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-slate-500 text-xs font-semibold block mb-1.5">Current Password</label>
                <div className="flex items-center bg-slate-50 rounded-xl px-3 py-3 border-2 border-slate-100 focus-within:border-blue-300 transition-colors">
                  <Lock size={15} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="flex-1 bg-transparent outline-none text-slate-700 text-sm"
                  />
                  <button onClick={() => setShowCurrent(!showCurrent)}>
                    {showCurrent ? <EyeOff size={15} className="text-slate-400" /> : <Eye size={15} className="text-slate-400" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-xs font-semibold block mb-1.5">New Password</label>
                <div className="flex items-center bg-slate-50 rounded-xl px-3 py-3 border-2 border-slate-100 focus-within:border-blue-300 transition-colors">
                  <Lock size={15} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Enter new password"
                    className="flex-1 bg-transparent outline-none text-slate-700 text-sm"
                  />
                  <button onClick={() => setShowNew(!showNew)}>
                    {showNew ? <EyeOff size={15} className="text-slate-400" /> : <Eye size={15} className="text-slate-400" />}
                  </button>
                </div>
              </div>

              {/* Password strength */}
              {newPass.length > 0 && (
                <div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full ${
                        newPass.length > i * 2
                          ? i <= 2 ? "bg-orange-400" : "bg-emerald-400"
                          : "bg-slate-100"
                      }`} />
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {newPass.length < 6 ? "Weak" : newPass.length < 10 ? "Medium" : "Strong"} password
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Store settings shortcuts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            {[
              { icon: Store, label: "Store Settings", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Bell, label: "Notifications", color: "text-violet-600", bg: "bg-violet-50" },
              { icon: Shield, label: "Privacy & Security", color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map(({ icon: Icon, label, color, bg }) => (
              <div key={label} className="flex items-center gap-3 p-4">
                <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={15} className={color} />
                </div>
                <p className="text-slate-700 font-medium text-sm flex-1">{label}</p>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            }`}
          >
            {saved ? (
              <>
                <Check size={18} strokeWidth={3} />
                Saved Successfully!
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          {/* Logout */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm border-2 border-red-100 text-red-500 flex items-center justify-center gap-2 mb-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}