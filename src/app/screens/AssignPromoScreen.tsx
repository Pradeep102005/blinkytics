import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, CheckCircle2, ChevronDown, UserSquare2, Tag, Check, Send, Users } from "lucide-react";

const tierColors: Record<string, string> = {
  Gold: "bg-amber-100 text-amber-600 border-amber-200",
  Silver: "bg-slate-100 text-slate-600 border-slate-200",
  Bronze: "bg-orange-100 text-orange-600 border-orange-200",
};

export function AssignPromoScreen() {
  const navigate = useNavigate();
  
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);
  
  const [assigned, setAssigned] = useState(false);
  const [showPromoList, setShowPromoList] = useState(false);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [tierStats, setTierStats] = useState<any>({ Gold: 0, Silver: 0, Bronze: 0 });

  useEffect(() => {
    fetch('http://localhost:8000/active-promos')
      .then(res => res.json())
      .then(data => {
        if (data.active_promos) setPromoCodes(data.active_promos);
      })
      .catch(console.error);
      
    fetch('http://localhost:8000/users/tiers')
      .then(res => res.json())
      .then(data => {
        if (data.tiers) setTierStats(data.tiers);
      })
      .catch(console.error);
  }, []);

  const promo = promoCodes.find((p) => p.code === selectedPromo);

  const toggleTier = (tier: string) => {
    if (selectedTiers.includes(tier)) {
      setSelectedTiers(selectedTiers.filter(t => t !== tier));
    } else {
      setSelectedTiers([...selectedTiers, tier]);
    }
  };

  const totalSelectedUsers = selectedTiers.reduce((acc, tier) => acc + (tierStats[tier] || 0), 0);

  const handleAssign = () => {
    if (selectedTiers.length > 0 && selectedPromo) setAssigned(true);
  };

  if (assigned) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50 px-8">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-lg">
          <Check size={36} className="text-emerald-600" strokeWidth={3} />
        </div>
        <h2 className="text-slate-800 font-bold text-xl mb-2">Promo Assigned!</h2>
        <p className="text-slate-500 text-sm text-center mb-6">
          <span className="font-semibold text-slate-700">{promo?.code}</span> has been assigned to{" "}
          <span className="font-semibold text-slate-700">{totalSelectedUsers} users</span> across {selectedTiers.join(', ')} tiers.
        </p>
        <div className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-6 text-center">
          <p className="text-slate-400 text-xs mb-1">Promo Code</p>
          <p className="text-blue-600 font-black text-2xl tracking-widest">{promo?.code}</p>
          <p className="text-emerald-600 font-semibold text-sm mt-1">{promo?.discount} OFF • {promo?.product}</p>
        </div>
        <button onClick={() => navigate("/promos")} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base">
          Back to Promos
        </button>
        <button onClick={() => { setAssigned(false); setSelectedTiers([]); setSelectedPromo(null); }}
          className="mt-3 text-slate-400 text-sm">
          Assign Another
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/promos")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Bulk Assign Promo</h1>
            <p className="text-slate-400 text-xs">Send codes to multiple user categories</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-4">
        {/* Step 1: Select Categories */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <h3 className="text-slate-800 font-bold text-sm">Select Target Categories</h3>
          </div>

          <div className="space-y-3">
            {["Gold", "Silver", "Bronze"].map((tier) => {
              const isSelected = selectedTiers.includes(tier);
              const count = tierStats[tier] || 0;
              return (
                <button
                  key={tier}
                  onClick={() => toggleTier(tier)}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all text-left ${
                    isSelected ? "border-violet-500 bg-violet-50" : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mr-3 border ${tierColors[tier]}`}>
                    <Users size={18} className="currentColor" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-bold text-sm tracking-wide">{tier} Tier</p>
                    <p className="text-slate-500 text-xs">{count} registered users</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center shrink-0">
                      <Check size={14} className="text-white flex-shrink-0" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Promo */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <h3 className="text-slate-800 font-bold text-sm">Select Coupon Code</h3>
          </div>

          <button
            onClick={() => setShowPromoList(!showPromoList)}
            className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl border-2 border-slate-100 mb-2 hover:border-pink-300 transition-colors"
          >
            <div className="w-9 h-9 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
              <Tag size={16} className="text-pink-600" />
            </div>
            <div className="flex-1 text-left">
              {promo ? (
                <>
                  <p className="text-slate-700 font-bold text-xs tracking-wide">{promo.code}</p>
                  <p className="text-slate-400 text-xs">{promo.discount} OFF • {promo.product}</p>
                </>
              ) : (
                <p className="text-slate-400 text-xs">Choose a promo code...</p>
              )}
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showPromoList ? "rotate-180" : ""}`} />
          </button>

          {showPromoList && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {promoCodes.map((pc) => (
                <button
                  key={pc.code}
                  onClick={() => { setSelectedPromo(pc.code); setShowPromoList(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    selectedPromo === pc.code ? "border-pink-400 bg-pink-50" : "border-slate-100 bg-slate-50 hover:border-pink-200"
                  }`}
                >
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                    <Tag size={14} className="text-pink-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 font-bold text-xs tracking-wide">{pc.code}</p>
                    <p className="text-slate-400 text-xs truncate">{pc.product}</p>
                  </div>
                  <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-lg font-bold shrink-0">{pc.discount} OFF</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Assign Button */}
        <button
          onClick={handleAssign}
          disabled={selectedTiers.length === 0 || !selectedPromo}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            selectedTiers.length > 0 && selectedPromo
              ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg active:scale-95"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Send size={18} />
          {selectedTiers.length > 0 && totalSelectedUsers > 0 
           ? `Assign to ${totalSelectedUsers} Users`
           : "Assign Promo Code"}
        </button>
      </div>
    </div>
  );
}
