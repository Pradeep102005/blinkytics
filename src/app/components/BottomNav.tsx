import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Package, TrendingUp, Tag, User } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Home", path: "/dashboard" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: TrendingUp, label: "Sales", path: "/sales-trends" },
  { icon: Tag, label: "Promos", path: "/promos" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex items-center justify-around px-2 py-2 z-50"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
      {navItems.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <div className={`p-1.5 rounded-xl transition-all ${active ? "bg-blue-50" : ""}`}>
              <Icon size={20} className={active ? "text-blue-600" : "text-slate-400"} strokeWidth={active ? 2.5 : 1.8} />
            </div>
            <span className={`text-[10px] font-medium ${active ? "text-blue-600" : "text-slate-400"}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
