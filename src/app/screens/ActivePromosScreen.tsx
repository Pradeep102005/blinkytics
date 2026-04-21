import { useNavigate } from "react-router";
import { ArrowLeft, Tag, Copy, MoreVertical, Trash2, Edit2, Play, Pause, Clock, User, Check } from "lucide-react";
import { useState, useEffect } from "react";

const categoryColors: Record<string, string> = {
  "Grocery": "bg-emerald-100 text-emerald-700",
  "Dairy": "bg-blue-100 text-blue-700",
  "Snacks": "bg-orange-100 text-orange-700",
};

export function ActivePromosScreen() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activePromos, setActivePromos] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/active-promos')
      .then(res => res.json())
      .then(data => {
        if (data.active_promos) setActivePromos(data.active_promos);
      })
      .catch(console.error);
  }, []);

  const handleCopy = (code: string) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/promos")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Active Promo Codes</h1>
            <p className="text-slate-400 text-xs">{activePromos.length} codes currently active</p>
          </div>
          <button onClick={() => navigate("/generate-promo")}
            className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1">
            <Tag size={12} />
            New
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 py-3 flex gap-3">
        {[
          { label: "Active", value: "5", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Uses", value: "43", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Expiring Soon", value: "2", color: "text-orange-600", bg: "bg-orange-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`flex-1 ${bg} rounded-xl p-2.5 text-center`}>
            <p className={`font-bold text-sm ${color}`}>{value}</p>
            <p className="text-slate-400 text-xs mt-0.5" style={{ fontSize: 9 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Promo cards list */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3">
        {activePromos.map(({ code, product, discount, uses, maxUses, expires, assignedTo, category }) => {
          const pct = Math.round((uses / maxUses) * 100);
          const isCopied = copiedCode === code;
          return (
            <div key={code} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Top section */}
              <div className="p-4 pb-3">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-50 rounded-xl flex items-center justify-center shrink-0">
                      <Tag size={18} className="text-pink-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-slate-800 font-black text-sm tracking-wide">{code}</p>
                        <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${categoryColors[category] || "bg-slate-100 text-slate-500"}`}>
                        {category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-sm font-black px-3 py-1.5 rounded-xl">
                      {discount} OFF
                    </div>
                    <button className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                      <MoreVertical size={14} className="text-slate-400" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-600 text-xs font-medium mb-3 truncate">{product}</p>

                {/* Uses progress */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-400 text-xs">Usage</span>
                    <span className="text-slate-600 text-xs font-semibold">{uses}/{maxUses} used</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 70 ? "bg-orange-400" : "bg-blue-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom info */}
              <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock size={12} />
                    <span className="text-xs">Exp: {expires}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <User size={12} />
                    <span className="text-xs truncate max-w-24">{assignedTo}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(code)}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
                >
                  {isCopied ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-500 text-xs font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="text-slate-500" />
                      <span className="text-slate-500 text-xs font-semibold">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
