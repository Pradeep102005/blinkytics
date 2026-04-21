import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { BottomNav } from "../components/BottomNav";

export function SalesTrendsScreen() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"7" | "30">("7");
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([
    { label: "Total Sales", value: "₹...", change: "...", up: true },
    { label: "Orders", value: "...", change: "...", up: true },
    { label: "Avg Order", value: "₹...", change: "...", up: false },
  ]);

  useEffect(() => {
    fetch(`http://localhost:8000/sales/trend?days=${period}`)
      .then(res => res.json())
      .then(data => {
        if (data.chartData) setChartData(data.chartData);
        if (data.topProducts) setTopProducts(data.topProducts);
        if (data.stats) setStats(data.stats);
      })
      .catch(console.error);
  }, [period]);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Sales Trends</h1>
            <p className="text-slate-400 text-xs">Performance overview</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Stats */}
        <div className="px-5 py-4 grid grid-cols-3 gap-3">
          {stats.map(({ label, value, change, up }) => (
            <div key={label} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 text-center">
              <p className="text-slate-800 font-bold text-sm">{value}</p>
              <p className="text-slate-400 text-xs mt-0.5">{label}</p>
              <span className={`text-xs font-semibold ${up ? "text-emerald-500" : "text-red-500"}`}>{change}</span>
            </div>
          ))}
        </div>

        {/* Period selector */}
        <div className="px-5 mb-4">
          <div className="flex gap-2">
            {(["7", "30"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${period === p ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-100"}`}
              >
                Last {p} Days
              </button>
            ))}
          </div>
        </div>

        {/* Sales Chart */}
        <div className="mx-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-bold text-sm">Sales Revenue</h3>
            <div className="flex items-center gap-1 text-emerald-500">
              <TrendingUp size={14} />
              <span className="text-xs font-semibold">+12.4%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="salesArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={35}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }}
                formatter={(v: number) => [`₹${v.toLocaleString()}`, "Sales"]}
              />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fill="url(#salesArea)" dot={{ fill: "#3b82f6", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders chart */}
        <div className="mx-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-bold text-sm">Order Volume</h3>
            <span className="text-xs text-slate-400">Units sold</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="mx-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
          <h3 className="text-slate-800 font-bold text-sm mb-3">Top Performing Products</h3>
          <div className="space-y-3">
            {topProducts.map(({ name, sales, trend, change }) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
                <p className="text-slate-700 text-xs flex-1 font-medium">{name}</p>
                <span className="text-slate-800 text-xs font-bold">{sales}</span>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                  {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-5 mb-2">
          <button onClick={() => navigate("/sales-forecast")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg">
            <ArrowUpRight size={16} />
            View Sales Forecast
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
