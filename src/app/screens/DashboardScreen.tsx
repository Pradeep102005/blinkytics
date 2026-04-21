import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { BottomNav } from "../components/BottomNav";
import { Bell, Package, TrendingUp, Brain, Tag, ChevronRight, AlertTriangle, ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Inventory",
    subtitle: "248 Products",
    icon: Package,
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-400",
    badge: "3 Low Stock",
    badgeColor: "bg-orange-100 text-orange-600",
    path: "/inventory",
  },
  {
    title: "Sales Trends",
    subtitle: "+12.4% This Week",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-400",
    badge: "↑ Growing",
    badgeColor: "bg-emerald-100 text-emerald-600",
    path: "/sales-trends",
  },
  {
    title: "Forecast",
    subtitle: "Next 30 Days",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-400",
    badge: "94% Accuracy",
    badgeColor: "bg-violet-100 text-violet-600",
    path: "/sales-forecast",
  },
  {
    title: "Promo Codes",
    subtitle: "5 Active Codes",
    icon: Tag,
    color: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-400",
    badge: "2 Expiring",
    badgeColor: "bg-pink-100 text-pink-600",
    path: "/promos",
  },
];

export function DashboardScreen() {
  const navigate = useNavigate();
  const [quickStats, setQuickStats] = useState<any[]>([
    { label: "Today's Sales", value: "₹...", change: "...", up: true },
    { label: "Orders", value: "...", change: "...", up: true },
    { label: "Low Stock", value: "...", change: "...", up: false },
  ]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        if (data.quickStats) setQuickStats(data.quickStats);
        if (data.recentActivity) setRecentActivity(data.recentActivity);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-5 pt-5 pb-8 relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white opacity-5" />
          <div className="absolute bottom-[-30px] left-[40%] w-24 h-24 rounded-full bg-blue-400 opacity-15" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-200 text-xs font-medium">Good morning,</p>
              <h2 className="text-white font-bold text-lg">pradeep 👋</h2>
            </div>
            <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
              <Bell size={20} className="text-white" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400 rounded-full" />
            </button>
          </div>
          <p className="text-blue-100 text-xs">Tuesday, March 4, 2026 • Store: potheri</p>
        </div>

        {/* Quick Stats */}
        <div className="px-5 -mt-4 mb-5">
          <div className="bg-white rounded-2xl shadow-md p-4 flex gap-3">
            {quickStats.map(({ label, value, change, up }) => (
              <div key={label} className="flex-1 text-center">
                <p className="text-slate-800 font-bold text-base">{value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{label}</p>
                <span className={`text-xs font-semibold mt-0.5 inline-block ${up ? "text-emerald-500" : "text-orange-500"}`}>
                  {change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alert bar */}
        <div className="mx-5 mb-4 bg-orange-50 border border-orange-200 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle size={16} className="text-orange-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-orange-700 text-xs font-semibold">Low Stock Alert</p>
            <p className="text-orange-500 text-xs">7 products need restocking soon</p>
          </div>
          <button onClick={() => navigate("/low-stock")} className="text-orange-500 shrink-0">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Module Cards */}
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800 font-bold text-sm">Modules</h3>
            <span className="text-blue-500 text-xs font-medium">See all</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cards.map(({ title, subtitle, icon: Icon, color, iconBg, badge, badgeColor, path }) => (
              <button
                key={title}
                onClick={() => navigate(path)}
                className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-left relative overflow-hidden active:scale-95 transition-transform shadow-md`}
              >
                <div className="absolute top-[-15px] right-[-15px] w-20 h-20 rounded-full bg-white opacity-10" />
                <div className={`w-9 h-9 ${iconBg} bg-opacity-50 rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={18} className="text-white" strokeWidth={2} />
                </div>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-white text-opacity-80 text-xs mt-0.5">{subtitle}</p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>{badge}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800 font-bold text-sm">Recent Activity</h3>
            <span className="text-blue-500 text-xs font-medium">View all</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            {recentActivity.map(({ action, detail, time, color }) => (
              <div key={action} className="flex items-center gap-3 p-3">
                <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0`}>
                  <ArrowUpRight size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-xs font-semibold">{action}</p>
                  <p className="text-slate-400 text-xs truncate">{detail}</p>
                </div>
                <span className="text-slate-400 text-xs shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
