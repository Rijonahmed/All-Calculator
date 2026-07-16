"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 dark:shadow-yellow-500/10 group-hover:scale-105 transition-transform">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="14" height="6" rx="1" />
          <path d="M16 13H22v-2l-2-4h-4v6z" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="18" cy="17" r="2" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">TruckCalc</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Sand Capacity</span>
      </div>
    </Link>
  );
}

export default function TruckCalculator() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  const [length, setLength] = useState<string>("14");
  const [width, setWidth] = useState<string>("7");
  const [height, setHeight] = useState<string>("4");
  const [pricePerCft, setPricePerCft] = useState<string>("14");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { }
  }, [theme]);

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const p = parseFloat(pricePerCft) || 0;

  const totalCftVal = l * w * h;
  const totalCft = totalCftVal.toFixed(2);
  const totalPrice = (totalCftVal * p).toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <main className="flex-1 px-4 py-8 sm:py-12 bg-zinc-50 dark:bg-[#0f1525]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">Dump Truck Capacity</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Calculate the volume of sand/soil your truck can carry in cubic feet (cft)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              
              {/* Truck Visualization */}
              <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-6 uppercase tracking-wider relative z-10">Visual Guide</h3>
                
                <div className="relative w-full max-w-sm mx-auto aspect-[4/3] flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                    {/* Road */}
                    <line x1="20" y1="260" x2="380" y2="260" stroke="#71717a" strokeWidth="3" strokeDasharray="10 5" />
                    
                    {/* Truck Cabin */}
                    <path d="M250 160 H310 L330 190 V240 H250 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="4" strokeLinejoin="round" />
                    <rect x="260" y="170" width="40" height="30" rx="4" fill="#3f3f46" />
                    <circle cx="280" cy="240" r="20" fill="#27272a" stroke="#a1a1aa" strokeWidth="6" />
                    
                    {/* Truck Bed / Container */}
                    <path d="M70 120 H240 V240 H70 Z" fill="#0ea5e9" stroke="#0284c7" strokeWidth="4" strokeLinejoin="round" />
                    <line x1="120" y1="120" x2="120" y2="240" stroke="#0284c7" strokeWidth="2" />
                    <line x1="170" y1="120" x2="170" y2="240" stroke="#0284c7" strokeWidth="2" />
                    <circle cx="120" cy="240" r="20" fill="#27272a" stroke="#a1a1aa" strokeWidth="6" />
                    <circle cx="180" cy="240" r="20" fill="#27272a" stroke="#a1a1aa" strokeWidth="6" />
                    
                    {/* Sand inside */}
                    <path d="M74 120 L100 100 L150 115 L200 95 L236 120 Z" fill="#d97706" opacity="0.8" />
                    
                    {/* Dimension Markers */}
                    {/* Length */}
                    <line x1="70" y1="80" x2="240" y2="80" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    <path d="M80 70 L70 80 L80 90 M230 70 L240 80 L230 90" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="155" y="65" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">Length (L)</text>
                    
                    {/* Height */}
                    <line x1="40" y1="120" x2="40" y2="240" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                    <path d="M30 130 L40 120 L50 130 M30 230 L40 240 L50 230" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="30" y="185" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" transform="rotate(-90 30,185)">Height (H)</text>

                    {/* Width indication (3D simulated with text) */}
                    <circle cx="155" cy="180" r="40" fill="#ffffff" opacity="0.9" />
                    <circle cx="155" cy="180" r="40" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4 4" />
                    <text x="155" y="175" fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle">Width</text>
                    <text x="155" y="195" fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle">(Inside)</text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Inputs */}
              <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Enter Truck Dimensions</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Length (L) in Feet</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="e.g. 14"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">ft</div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Width (W) in Feet</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 7"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">ft</div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Height (H) in Feet</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 4"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">ft</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Price per CFT</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pricePerCft}
                        onChange={(e) => setPricePerCft(e.target.value)}
                        placeholder="e.g. 14"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-6">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider font-semibold">Total Capacity</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl sm:text-5xl font-bold text-yellow-600 dark:text-yellow-500 tracking-tight leading-none truncate" title={totalCft}>
                        {totalCft}
                      </span>
                      <span className="text-lg font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                        cft
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider font-semibold">Total Price</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-emerald-600 dark:text-emerald-500 tracking-tight leading-none truncate" title={totalPrice}>
                        {totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    </main>
  );
}
