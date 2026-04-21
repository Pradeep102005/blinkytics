import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, Package, Tag, TrendingDown } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

import { useState, useEffect } from "react";

const reasonConfig = {
  "low-stock": { label: "Low Stock", color: "text-orange-600", bg: "bg-orange-100", icon: AlertTriangle },
  "low-selling": { label: "Low Demand", color: "text-blue-600", bg: "bg-blue-100", icon: TrendingDown },
  "out-of-stock": { label: "Out of Stock", color: "text-red-600", bg: "bg-red-100", icon: Package },
};

export function LowStockScreen() {
  const navigate = useNavigate();
  const [lowProducts, setLowProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/low-selling')
      .then(res => res.json())
      .then(data => {
        if (data.low_selling_products) {
          const mapped = data.low_selling_products.map((p: any, i: number) => ({
            id: String(i),
            name: p.product_name,
            category: p.category,
            stock: 12, // default mock stock since API doesn't return current stock here
            weekSales: Math.round(p.average_daily_sales * 7),
            reason: "low-selling"
          }));
          setLowProducts(mapped);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/inventory")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Low Stock / Low Selling</h1>
            <p className="text-slate-400 text-xs">{lowProducts.length} products need attention</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 py-3 flex gap-2">
        {[
          { label: "Low Stock", count: 3, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Low Demand", count: 3, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Out of Stock", count: 1, color: "text-red-600", bg: "bg-red-50" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`flex-1 ${bg} rounded-xl px-2 py-2 text-center`}>
            <p className={`font-bold text-sm ${color}`}>{count}</p>
            <p className="text-slate-500 text-xs mt-0.5" style={{ fontSize: 9 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Alert banner */}
      <div className="mx-5 mb-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
          <Tag size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">Boost Sales with Promos</p>
          <p className="text-orange-100 text-xs mt-0.5">Generate discounts for low-demand items</p>
        </div>
        <button
          onClick={() => navigate("/generate-promo")}
          className="bg-white text-orange-600 text-xs font-bold px-3 py-2 rounded-xl shrink-0"
        >
          Generate
        </button>
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        <div className="space-y-3">
          {lowProducts.map((product) => {
            const cfg = reasonConfig[product.reason as keyof typeof reasonConfig];
            const Icon = cfg.icon;
            return (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-slate-800 font-semibold text-sm">{product.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{product.category}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${cfg.bg} ${cfg.color} shrink-0`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Package size={12} className="text-slate-400" />
                        <span className="text-slate-500 text-xs">Stock: <span className="font-semibold text-slate-700">{product.stock}</span></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingDown size={12} className="text-slate-400" />
                        <span className="text-slate-500 text-xs">Wk Sales: <span className="font-semibold text-slate-700">{product.weekSales}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/generate-promo")}
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Tag size={13} />
                  Generate Promo Code
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
