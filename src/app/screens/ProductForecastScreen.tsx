import { useNavigate } from "react-router";
import { ArrowLeft, Package, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

import { useState, useEffect } from "react";

const demandConfig = {
  High: { color: "text-emerald-600", bg: "bg-emerald-100", bar: "bg-emerald-400", icon: TrendingUp, barWidth: "90%" },
  Medium: { color: "text-blue-600", bg: "bg-blue-100", bar: "bg-blue-400", icon: Minus, barWidth: "55%" },
  Low: { color: "text-red-500", bg: "bg-red-100", bar: "bg-red-400", icon: TrendingDown, barWidth: "20%" },
};

export function ProductForecastScreen() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForecasts() {
      try {
        const res = await fetch('http://localhost:8000/products');
        const data = await res.json();
        const topProducts = data.products.slice(0, 10);
        
        const forecastPromises = topProducts.map(async (p: any) => {
          const forecastRes = await fetch('http://localhost:8000/forecast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_name: p.product_name })
          });
          const forecastData = await forecastRes.json();
          
          let totalForecast = 0;
          if (forecastData.forecast) {
            totalForecast = forecastData.forecast.reduce((sum: number, day: any) => sum + day.predicted_sales, 0);
          }
          
          let demand = "Medium";
          if (totalForecast > 100) demand = "High";
          else if (totalForecast < 20) demand = "Low";
          
          return {
            name: p.product_name,
            category: p.category,
            demand,
            forecastUnits: totalForecast,
            change: totalForecast > 50 ? "+12%" : "-4%"
          };
        });
        
        const results = await Promise.all(forecastPromises);
        setProducts(results);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchForecasts();
  }, []);

  const highCount = products.filter((p) => p.demand === "High").length;
  const medCount = products.filter((p) => p.demand === "Medium").length;
  const lowCount = products.filter((p) => p.demand === "Low").length;

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/sales-forecast")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Product-wise Forecast</h1>
            <p className="text-slate-400 text-xs">Next 30 days demand prediction</p>
          </div>
        </div>
      </div>

      {/* Demand summary */}
      <div className="px-5 py-3 grid grid-cols-3 gap-2">
        {[
          { label: "High Demand", count: highCount, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
          { label: "Medium", count: medCount, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
          { label: "Low Demand", count: lowCount, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
        ].map(({ label, count, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-xl px-2 py-2.5 text-center`}>
            <p className={`font-bold text-base ${color}`}>{count}</p>
            <p className="text-slate-500 text-xs mt-0.5" style={{ fontSize: 9 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        <div className="space-y-2.5">
          {products.map((product, i) => {
            const cfg = demandConfig[product.demand as keyof typeof demandConfig];
            const Icon = cfg.icon;
            return (
              <div key={product.name} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <Package size={17} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-800 font-semibold text-xs truncate">{product.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-lg font-bold ${cfg.bg} ${cfg.color} ml-2 shrink-0`}>
                        {product.demand}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5 mb-2">{product.category}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${cfg.bar} rounded-full`} style={{ width: cfg.barWidth }} />
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right ml-2">
                    <p className="text-slate-800 font-bold text-sm">{product.forecastUnits}</p>
                    <p className="text-slate-400 text-xs">units</p>
                    <div className={`flex items-center gap-0.5 justify-end ${product.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                      <Icon size={11} />
                      <span className="text-xs font-semibold">{product.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
