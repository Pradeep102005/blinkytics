import { useNavigate } from "react-router";
import { ArrowLeft, Search, Filter, Package, ChevronRight } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

import { useState, useEffect } from "react";

const statusConfig = {
  good: { label: "In Stock", color: "text-emerald-600", bg: "bg-emerald-100", bar: "bg-emerald-400" },
  low: { label: "Low Stock", color: "text-orange-600", bg: "bg-orange-100", bar: "bg-orange-400" },
  out: { label: "Out of Stock", color: "text-red-600", bg: "bg-red-100", bar: "bg-red-400" },
};

export function InventoryOverviewScreen() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => {
        const mapped = data.products.map((p: any, i: number) => {
          let status = 'good';
          if (p.stock_quantity === 0) status = 'out';
          else if (p.stock_quantity < 20) status = 'low';
          return {
            id: p.id,
            name: p.product_name,
            category: p.category,
            stock: p.stock_quantity,
            total: 300,
            status: status
          };
        });
        setProducts(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-lg">Inventory</h1>
            <p className="text-slate-400 text-xs">248 products • Last updated 5m ago</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
            <Filter size={16} className="text-blue-600" />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 gap-3">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input className="flex-1 bg-transparent outline-none text-sm text-slate-600" placeholder="Search products..." />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-3">
          {["All", "In Stock", "Low Stock", "Out"].map((f, i) => (
            <button key={f}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${i === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 py-3 flex gap-3">
        {[
          { label: "Total", value: "248", color: "text-slate-700", bg: "bg-white" },
          { label: "In Stock", value: "187", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Low Stock", value: "54", color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Out of Stock", value: "7", color: "text-red-600", bg: "bg-red-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`flex-1 ${bg} rounded-xl p-2 text-center`}>
            <p className={`font-bold text-sm ${color}`}>{value}</p>
            <p className="text-slate-400 text-xs mt-0.5" style={{ fontSize: 9 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        <div className="space-y-3">
          {products.map((product) => {
            const cfg = statusConfig[product.status as keyof typeof statusConfig];
            const pct = Math.round((product.stock / product.total) * 100);
            return (
              <button
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-slate-100 active:scale-98 transition-transform text-left"
              >
                <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Package size={20} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-slate-800 font-semibold text-sm truncate">{product.name}</p>
                    <ChevronRight size={14} className="text-slate-400 shrink-0 ml-2" />
                  </div>
                  <p className="text-slate-400 text-xs mb-2">{product.category}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cfg.bar} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-slate-600 text-xs font-medium shrink-0">{product.stock}/{product.total}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
