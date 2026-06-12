"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";

type Unit = "ft" | "in" | "m";

interface Room {
  id: string;
  name: string;
  length: string;
  width: string;
  unit: Unit;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/10 group-hover:scale-105 transition-transform">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">AreaCalc</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Measurement Tool</span>
      </div>
    </Link>
  );
}

export default function AreaCalculator() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [rooms, setRooms] = useState<Room[]>([
    { id: generateId(), name: "Living Room", length: "", width: "", unit: "ft" }
  ]);
  const [copied, setCopied] = useState(false);

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

  const addRoom = () => {
    setRooms([
      ...rooms,
      { id: generateId(), name: `Room ${rooms.length + 1}`, length: "", width: "", unit: "ft" }
    ]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  const updateRoom = (id: string, field: keyof Room, value: string) => {
    setRooms(
      rooms.map((room) => (room.id === id ? { ...room, [field]: value } : room))
    );
  };

  const resetAll = () => {
    setRooms([
      { id: generateId(), name: "Living Room", length: "", width: "", unit: "ft" }
    ]);
  };

  const calculateRoomArea = (room: Room) => {
    const l = parseFloat(room.length) || 0;
    const w = parseFloat(room.width) || 0;
    let sqft = 0;
    let sqm = 0;

    if (room.unit === "ft") {
      sqft = l * w;
      sqm = sqft * 0.092903;
    } else if (room.unit === "in") {
      sqft = (l / 12) * (w / 12);
      sqm = sqft * 0.092903;
    } else if (room.unit === "m") {
      sqm = l * w;
      sqft = sqm / 0.092903;
    }

    return {
      l, w, unit: room.unit,
      sqft: sqft.toFixed(2),
      sqm: sqm.toFixed(2),
      rawSqft: sqft,
      rawSqm: sqm
    };
  };

  const totals = useMemo(() => {
    let totalSqft = 0;
    let totalSqm = 0;
    rooms.forEach((room) => {
      const res = calculateRoomArea(room);
      totalSqft += res.rawSqft;
      totalSqm += res.rawSqm;
    });
    return {
      totalSqft: totalSqft.toFixed(2),
      totalSqm: totalSqm.toFixed(2),
      roomCount: rooms.length
    };
  }, [rooms]);

  const copyResult = useCallback(() => {
    const text = `Total House Area: ${totals.totalSqft} sq ft (${totals.totalSqm} m²) across ${totals.roomCount} room(s).`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [totals]);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 dark:bg-[#0f1525]">
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-[#0f1525]/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Left Column: Rooms Inputs */}
          <div className="flex-1 space-y-6">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">House & Room Area Calculator</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Calculate room and house area instantly in square feet and square meters.
              </p>
            </div>

            {rooms.map((room, index) => {
              const res = calculateRoomArea(room);
              return (
                <div key={room.id} className="bg-white dark:bg-zinc-900/80 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5 sm:p-6 transition-all duration-300 relative group">
                  {rooms.length > 1 && (
                    <button 
                      onClick={() => removeRoom(room.id)}
                      className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors"
                      title="Remove Room"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  )}
                  
                  <div className="mb-4 pr-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <input
                      type="text"
                      value={room.name}
                      onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                      placeholder="Room Name"
                      className="text-lg font-semibold bg-transparent border-b border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none w-full transition-colors pb-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Length</label>
                      <input
                        type="number"
                        value={room.length}
                        onChange={(e) => updateRoom(room.id, "length", e.target.value)}
                        placeholder="e.g. 12"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Width</label>
                      <input
                        type="number"
                        value={room.width}
                        onChange={(e) => updateRoom(room.id, "width", e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Unit</label>
                      <select
                        value={room.unit}
                        onChange={(e) => updateRoom(room.id, "unit", e.target.value as Unit)}
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-200 cursor-pointer"
                      >
                        <option value="ft">Feet (ft)</option>
                        <option value="in">Inches (in)</option>
                        <option value="m">Meters (m)</option>
                      </select>
                    </div>
                  </div>

                  {(res.l > 0 && res.w > 0) && (
                    <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/50">
                      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="8" y1="10" x2="8" y2="10.01"/></svg>
                        Calculation Steps
                      </p>
                      <div className="font-mono text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                        <p>Length = {res.l} {res.unit}</p>
                        <p>Width = {res.w} {res.unit}</p>
                        <p>Area = {res.l} &times; {res.w} = <span className="font-bold text-cyan-600 dark:text-cyan-400">{res.l * res.w} sq {res.unit}</span></p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700/50 flex flex-wrap gap-x-6 gap-y-2">
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          {res.sqft} <span className="text-zinc-500 font-normal">sq ft</span>
                        </p>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          {res.sqm} <span className="text-zinc-500 font-normal">m²</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={addRoom}
              className="w-full py-3 sm:py-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-all font-medium flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Another Room
            </button>
          </div>

          {/* Right Column: Summary */}
          <div className="w-full lg:w-[350px]">
            <div className="sticky top-20 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                House Area Summary
              </h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    Total Rooms
                  </p>
                  <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tabular-nums tracking-tight">
                    {totals.roomCount}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    Total Square Feet
                  </p>
                  <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 tabular-nums tracking-tight flex items-baseline gap-2">
                    {totals.totalSqft}
                    <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">sq ft</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    Total Square Meters
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 tabular-nums tracking-tight flex items-baseline gap-2">
                    {totals.totalSqm}
                    <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">m²</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={copyResult}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-sm shadow-cyan-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      Copy Results
                    </>
                  )}
                </button>
                <button
                  onClick={resetAll}
                  className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold transition-all active:scale-[0.98]"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
