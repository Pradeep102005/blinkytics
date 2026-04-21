import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Brain, TrendingUp, ChevronRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";
import { BottomNav } from "../components/BottomNav";

export function SalesForecastScreen() {
  const navigate = useNavigate();
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([
    { title: "Peak Sales Day", value: "...", detail: "...", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Expected Revenue", value: "...", detail: "...", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Demand Growth", value: "...", detail: "...", color: "text-violet-600", bg: "bg-violet-50" },
  ]);

  useEffect(() => {
    fetch('http://localhost:8000/sales/forecast')
      .then(res => res.json())
      .then(data => {
        if (data.forecastData) setForecastData(data.forecastData);
        if (data.insights) setInsights(data.insights);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/sales-trends")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Sales Forecast</h1>
            <p className="text-slate-400 text-xs">AI-powered predictions • 94% accuracy</p>
          </div>
          <div className="w-9 h-9 bg-violet-50 rounded-full flex items-center justify-center">
            <Brain size={18} className="text-violet-600" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* AI Confidence banner */}
        <div className="mx-5 mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shrink-0">
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">AI Forecast Ready</p>
            <p className="text-violet-200 text-xs mt-0.5">Model trained on 6 months data</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 bg-white bg-opacity-30 rounded-full overflow-hidden" style={{ width: 80 }}>
                <div className="h-full bg-white rounded-full" style={{ width: "94%" }} />
              </div>
              <span className="text-white text-xs font-bold">94% Confidence</span>
            </div>
          </div>
        </div>

        {/* Forecast chart */}
        <div className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-slate-800 font-bold text-sm">Revenue Forecast</h3>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">8-week view</span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 bg-blue-500 rounded-full" />
              <span className="text-xs text-slate-500">Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 bg-violet-400 rounded-full border-dashed" style={{ borderTop: "2px dashed #8b5cf6", height: 0, borderRadius: 0, background: "none" }} />
              <span className="text-xs text-slate-500">Predicted</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={35}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }}
                formatter={(v: number) => v ? [`₹${v.toLocaleString()}`, ""] : null}
              />
              <ReferenceLine x="Now" stroke="#e2e8f0" strokeDasharray="4 2" label={{ value: "Today", fontSize: 9, fill: "#94a3b8" }} />
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2.5} fill="url(#actualGrad)" connectNulls dot={{ fill: "#3b82f6", r: 3 }} />
              <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="5 3" fill="url(#forecastGrad)" connectNulls dot={{ fill: "#8b5cf6", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="px-5 mt-4">
          <h3 className="text-slate-800 font-bold text-sm mb-3">Key Insights</h3>
          <div className="space-y-2">
            {insights.map(({ title, value, detail, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-slate-100">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <TrendingUp size={18} className={color} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-xs">{title}</p>
                  <p className={`font-bold text-sm ${color}`}>{value}</p>
                  <p className="text-slate-400 text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product wise forecast CTA */}
        <div className="mx-5 mt-4 mb-2">
          <button onClick={() => navigate("/product-forecast")}
            className="w-full bg-white border-2 border-violet-200 text-violet-600 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
            Product-wise Forecast
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
