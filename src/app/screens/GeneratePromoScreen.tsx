import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Tag, Package, Check, Sparkles, Copy } from "lucide-react";
export function GeneratePromoScreen() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const [generated, setGenerated] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const discounts = [10, 20, 30];

  useEffect(() => {
    fetch('http://localhost:8000/low-selling')
      .then(res => res.json())
      .then(data => {
        if (data.low_selling_products) {
          const mapped = data.low_selling_products.map((p: any, i: number) => ({
            id: String(i),
            name: p.product_name,
            stock: 10
          }));
          setProducts(mapped);
        }
      })
      .catch(console.error);
  }, []);

  const handleGenerate = async () => {
    if (!selectedProduct || !selectedDiscount) return;
    
    // Find product name
    const prod = products.find(p => p.id === selectedProduct);
    if (!prod) return;
    
    try {
      const res = await fetch('http://localhost:8000/generate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: prod.name })
      });
      const data = await res.json();
      if (data.promo_code) {
        setGenerated(data.promo_code);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      const prefix = ["SAVE", "FLAT", "GET", "HOT"][Math.floor(Math.random() * 4)];
      setGenerated(`${prefix}${selectedDiscount}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
    }
  };

  const handleCopy = () => {
    if (generated) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/promos")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-slate-800 font-bold text-base">Generate Promo Code</h1>
            <p className="text-slate-400 text-xs">Create discount for low-selling products</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-4">
        {/* Step 1: Select Product */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <h3 className="text-slate-800 font-bold text-sm">Select Product</h3>
          </div>
          <div className="space-y-2 max-h-44 overflow-y-auto">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  selectedProduct === product.id
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <Package size={15} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 font-semibold text-xs truncate">{product.name}</p>
                  <p className="text-slate-400 text-xs">Stock: {product.stock} units</p>
                </div>
                {selectedProduct === product.id && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Discount */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <h3 className="text-slate-800 font-bold text-sm">Select Discount</h3>
          </div>
          <div className="flex gap-3">
            {discounts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDiscount(d)}
                className={`flex-1 py-5 rounded-2xl border-2 font-bold text-lg transition-all ${
                  selectedDiscount === d
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg"
                    : "border-slate-100 bg-slate-50 text-slate-600"
                }`}
              >
                {d}%
                <p className={`text-xs font-medium mt-0.5 ${selectedDiscount === d ? "text-blue-100" : "text-slate-400"}`}>OFF</p>
              </button>
            ))}
          </div>
        </div>

        {/* Generated Code */}
        {generated && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles size={22} className="text-emerald-600" />
            </div>
            <p className="text-slate-500 text-xs mb-2">Your Promo Code</p>
            <div className="bg-white rounded-xl px-4 py-3 inline-flex items-center gap-3 shadow-sm border border-emerald-200">
              <span className="text-emerald-700 font-black text-xl tracking-widest">{generated}</span>
              <button onClick={handleCopy} className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-emerald-600" />}
              </button>
            </div>
            <p className="text-emerald-600 text-xs mt-3 font-medium">
              {selectedDiscount}% OFF • Valid for 7 days
            </p>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedProduct || !selectedDiscount}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            selectedProduct && selectedDiscount
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg active:scale-95"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Tag size={18} />
          Generate Promo Code
        </button>

        {generated && (
          <button
            onClick={() => navigate("/assign-promo")}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm border-2 border-blue-200 text-blue-600 flex items-center justify-center gap-2"
          >
            Assign to User →
          </button>
        )}
      </div>
    </div>
  );
}
