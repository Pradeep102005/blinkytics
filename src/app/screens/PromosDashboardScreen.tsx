import { useNavigate } from "react-router";
import { ArrowLeft, Tag, Plus, List, UserPlus, Sparkles } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

import { useState, useEffect } from "react";

export function PromosDashboardScreen() {
  const navigate = useNavigate();
  const [recentPromos, setRecentPromos] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/active-promos')
      .then(res => res.json())
      .then(data => {
        if (data.active_promos) {
          const mapped = data.active_promos.map((p: any) => ({
            code: p.promo_code,
            product: p.product_name,
            discount: "10%",
            uses: 0,
            expires: "Dec 31"
          }));
          setRecentPromos(mapped);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 px-5 pt-4 pb-8 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white opacity-5" />
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-bold text-lg">Promo Codes</h1>
            <p className="text-pink-100 text-xs">Manage all your promotions</p>
          </div>
          <div className="w-9 h-9 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Tag size={18} className="text-white" />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          {[
            { label: "Active", value: recentPromos.length.toString() },
            { label: "Total Uses", value: "0" },
            { label: "Savings Given", value: "₹0" },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 bg-white bg-opacity-15 rounded-2xl p-3 text-center">
              <p className="text-white font-bold text-base">{value}</p>
              <p className="text-pink-100 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 -mt-3">
        {/* Action Cards */}
        <div className="px-5 mb-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Plus, label: "Generate\nPromo", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", path: "/generate-promo" },
              { icon: List, label: "Active\nPromos", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", path: "/active-promos" },
              { icon: UserPlus, label: "Assign\nPromo", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", path: "/assign-promo" },
            ].map(({ icon: Icon, label, color, bg, border, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`${bg} border ${border} rounded-2xl py-4 flex flex-col items-center gap-2 active:scale-95 transition-transform`}
              >
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon size={20} className={color} />
                </div>
                <span className={`${color} font-semibold text-xs text-center`} style={{ whiteSpace: "pre-line" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tips banner */}
        <div className="mx-5 mb-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Boost Low Sellers</p>
            <p className="text-amber-100 text-xs mt-0.5">3 products need promo codes now</p>
          </div>
          <button onClick={() => navigate("/low-stock")} className="bg-white text-amber-600 text-xs font-bold px-3 py-2 rounded-xl shrink-0 ml-auto">
            View
          </button>
        </div>

        {/* Recent promos */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800 font-bold text-sm">Recent Promos</h3>
            <button onClick={() => navigate("/active-promos")} className="text-blue-500 text-xs font-medium">See all</button>
          </div>
          <div className="space-y-3">
            {recentPromos.map(({ code, product, discount, uses, expires }) => (
              <div key={code} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Tag size={20} className="text-pink-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-slate-800 font-bold text-sm">{code}</p>
                      <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-0.5 rounded-lg font-semibold">Active</span>
                    </div>
                    <p className="text-slate-400 text-xs truncate mt-0.5">{product}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-pink-600 font-bold text-sm">{discount} OFF</p>
                    <p className="text-slate-400 text-xs">{uses} uses</p>
                    <p className="text-slate-400 text-xs">Exp: {expires}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
