import { Outlet } from "react-router";

export function PhoneFrame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          boxShadow: "0 30px 80px rgba(0,0,0,0.25), 0 0 0 2px #d1d5db, inset 0 0 0 2px #f9fafb",
          background: "#fff",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-white z-50" style={{ minHeight: 44 }}>
          <span className="text-xs font-semibold text-slate-800">9:41</span>
          <div className="w-24 h-6 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="#1e293b"/>
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#1e293b"/>
              <rect x="9" y="0" width="3" height="12" rx="1" fill="#1e293b"/>
              <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#1e293b" opacity="0.3"/>
            </svg>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill="#1e293b"/>
              <path d="M7.5 5.5C8.8 5.5 10 6 10.9 6.9L12.3 5.5C11 4.2 9.3 3.5 7.5 3.5C5.7 3.5 4 4.2 2.7 5.5L4.1 6.9C5 6 6.2 5.5 7.5 5.5Z" fill="#1e293b"/>
              <circle cx="7.5" cy="10" r="1.5" fill="#1e293b"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1e293b" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="16" height="8" rx="2" fill="#1e293b"/>
              <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="#1e293b" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative">
          <Outlet />
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 bg-white" style={{ minHeight: 28 }}>
          <div className="w-32 h-1 bg-slate-300 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}
