import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Package, TrendingUp, TrendingDown, ShoppingBag, AlertTriangle, BarChart2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const statusConfig = {
  good: { label: "In Stock", color: "text-emerald-600", bg: "bg-emerald-100", bar: "bg-emerald-400" },
  low: { label: "Low Stock", color: "text-orange-600", bg: "bg-orange-100", bar: "bg-orange-400" },
  out: { label: "Out of Stock", color: "text-red-600", bg: "bg-red-100", bar: "bg-red-400" },
};

export function ProductDetailsScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id || '1'}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="h-full flex items-center justify-center text-slate-500">Loading product data...</div>;
  }

  if (!product || !product.status) {
    return <div className="h-full flex flex-col items-center justify-center p-5 text-center">
      <AlertTriangle size={32} className="text-orange-500 mb-3" />
      <p className="text-slate-800 font-bold mb-2">Product Not Found</p>
      <button onClick={() => navigate("/inventory")} className="text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-sm font-semibold">Return to Inventory</button>
    </div>;
  }

  const cfg = statusConfig[product.status as keyof typeof statusConfig] || statusConfig.good;
  const pct = Math.round((product.stock / product.total) * 100);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/inventory")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Product Details</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 pb-6 space-y-4">
        {/* Product hero */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <Package size={28} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-slate-800 font-bold text-base">{product.name}</h2>
              <p className="text-slate-400 text-xs mt-0.5">{product.category} • SKU: {product.sku}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-600 font-bold text-lg">{product.price}</span>
                <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
              </div>
            </div>
          </div>

          {/* Stock progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-500 text-xs">Stock Level</span>
              <span className="text-slate-700 text-xs font-semibold">{product.stock} / {product.total} units</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${cfg.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-slate-400 text-xs mt-1">{pct}% remaining</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Last Week Sales", value: product.lastWeekSales.toString(), sub: "units", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Revenue", value: product.revenue, sub: "total", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Rating", value: product.rating.toString(), sub: "/ 5.0", icon: BarChart2, color: "text-violet-600", bg: "bg-violet-50" },
          ].map(({ label, value, sub, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 text-center">
              <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon size={15} className={color} />
              </div>
              <p className={`font-bold text-sm ${color}`}>{value}</p>
              <p className="text-slate-400 text-xs">{sub}</p>
              <p className="text-slate-500 text-xs font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Low stock warning */}
        {product.status === "low" && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-orange-700 font-semibold text-sm">Low Stock Warning</p>
              <p className="text-orange-500 text-xs mt-0.5">Restock soon. Sales may be affected.</p>
            </div>
          </div>
        )}

        {/* Sales chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-bold text-sm">Weekly Sales</h3>
            <span className="text-blue-500 text-xs font-medium">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={product.salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fill="url(#salesGrad)" dot={{ fill: "#3b82f6", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => navigate("/low-stock")}
            className="flex-1 bg-orange-500 text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
            <TrendingDown size={16} />
            Generate Promo
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3.5 rounded-2xl font-semibold text-sm">
            Restock
          </button>
        </div>
      </div>
    </div>
  );
}
