"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Car, Bike, Calculator, Fuel, Droplets, Banknote, Map, ArrowRightLeft, Share2, Copy, Download, Trash2, Globe } from "lucide-react";

// --- Translations ---
const translations = {
  en: {
    title: "Mileage Calculator",
    subtitle: "Calculate vehicle fuel efficiency and costs",
    standardCalculator: "Standard Calculator",
    bmiCalculator: "BMI Calculator",
    vehicleType: "Vehicle Type",
    car: "Car",
    motorcycle: "Motorcycle",
    basic: "Basic",
    fullTank: "Full Tank",
    fuelCost: "Fuel Cost",
    tripCost: "Trip Cost",
    distance: "Distance Traveled",
    fuelUsed: "Fuel Used",
    prevOdo: "Previous Odometer",
    curOdo: "Current Odometer",
    fuelFilled: "Fuel Filled",
    vehicleMileage: "Vehicle Mileage",
    fuelPrice: "Fuel Price",
    calculate: "Calculate",
    results: "Your Results",
    mileage: "Mileage",
    fuelConsumption: "Fuel Consumption",
    totalFuel: "Total Fuel Required",
    totalCost: "Total Fuel Cost",
    costPer: "Cost Per",
    roundTripCost: "Round Trip Cost",
    history: "History",
    clearHistory: "Clear",
    exportCsv: "Export CSV",
    noHistory: "No recent calculations.",
    copied: "Copied!",
    copy: "Copy",
    share: "Share",
    howToUseTitle: "How to Use This Calculator",
    howToUseText: "Select your vehicle type and preferred units. Choose the appropriate calculator mode (Basic, Full Tank, Fuel Cost, or Trip Estimator). Input the required data such as distance, fuel, or odometer readings, then click 'Calculate' to view your detailed mileage and cost metrics. Your results will automatically be saved to history.",
    faqTitle: "Frequently Asked Questions",
    faq1q: "What is a good car mileage?",
    faq1a: "A good car mileage depends on the vehicle type. Modern hatchbacks and sedans typically offer 15-20 km/L (35-47 MPG), while SUVs may offer 10-15 km/L (23-35 MPG). Hybrid vehicles can achieve upwards of 25 km/L (58 MPG).",
    faq2q: "What is a good bike mileage?",
    faq2a: "Commuter motorcycles (100cc-150cc) generally provide excellent mileage ranging from 45-65 km/L. Higher capacity performance bikes (300cc+) typically offer 25-35 km/L.",
    faq3q: "How to calculate mileage?",
    faq3a: "The basic formula is: Mileage = Distance Traveled ÷ Fuel Consumed. For example, if you drove 150 km using 10 Liters of fuel, your mileage is 150 / 10 = 15 km/L.",
    faq4q: "Difference between km/L and MPG?",
    faq4a: "km/L stands for Kilometers per Liter (metric system), while MPG stands for Miles per Gallon (imperial system). To convert km/L to US MPG, multiply by 2.352.",
    faq5q: "How to improve fuel efficiency?",
    faq5a: "1. Maintain steady speeds. 2. Ensure proper tire pressure. 3. Avoid aggressive acceleration and hard braking. 4. Reduce excess weight in the vehicle. 5. Perform regular engine maintenance and oil changes.",
    distUnit: "km",
    fuelUnit: "L",
    mpg: "MPG",
    lPer100: "L/100km"
  },
  bn: {
    title: "মাইলেজ ক্যালকুলেটর",
    subtitle: "আপনার গাড়ির জ্বালানী দক্ষতা এবং খরচ হিসাব করুন",
    standardCalculator: "স্ট্যান্ডার্ড ক্যালকুলেটর",
    bmiCalculator: "বিএমআই ক্যালকুলেটর",
    vehicleType: "গাড়ির ধরন",
    car: "গাড়ি",
    motorcycle: "মোটরসাইকেল",
    basic: "বেসিক",
    fullTank: "ফুল ট্যাংক",
    fuelCost: "জ্বালানী খরচ",
    tripCost: "ট্রিপ খরচ",
    distance: "অতিক্রান্ত দূরত্ব",
    fuelUsed: "ব্যবহৃত জ্বালানী",
    prevOdo: "পূর্ববর্তী ওডোমিটার",
    curOdo: "বর্তমান ওডোমিটার",
    fuelFilled: "ভরা জ্বালানী",
    vehicleMileage: "গাড়ির মাইলেজ",
    fuelPrice: "জ্বালানীর দাম",
    calculate: "হিসাব করুন",
    results: "ফলাফল",
    mileage: "মাইলেজ",
    fuelConsumption: "জ্বালানী খরচ",
    totalFuel: "প্রয়োজনীয় জ্বালানী",
    totalCost: "মোট জ্বালানী খরচ",
    costPer: "প্রতি খরচ",
    roundTripCost: "রাউন্ড ট্রিপ খরচ",
    history: "হিসাবের ইতিহাস",
    clearHistory: "মুছুন",
    exportCsv: "CSV এক্সপোর্ট",
    noHistory: "কোনো সাম্প্রতিক হিসাব নেই।",
    copied: "কপি হয়েছে!",
    copy: "কপি",
    share: "শেয়ার",
    howToUseTitle: "কীভাবে এই ক্যালকুলেটর ব্যবহার করবেন",
    howToUseText: "আপনার গাড়ির ধরন এবং পছন্দের ইউনিট নির্বাচন করুন। উপযুক্ত ক্যালকুলেটর মোড (বেসিক, ফুল ট্যাংক, জ্বালানী খরচ, বা ট্রিপ এস্টিমেটর) বেছে নিন। দূরত্ব, জ্বালানী বা ওডোমিটার রিডিংয়ের মতো প্রয়োজনীয় ডেটা ইনপুট করুন, তারপর আপনার বিস্তারিত মাইলেজ এবং খরচের মেট্রিক্স দেখতে 'হিসাব করুন' বাটনে ক্লিক করুন। আপনার ফলাফল স্বয়ংক্রিয়ভাবে ইতিহাসে সংরক্ষিত হবে।",
    faqTitle: "সাধারণ জিজ্ঞাসা (FAQ)",
    faq1q: "গাড়ির জন্য ভালো মাইলেজ কত?",
    faq1a: "সাধারণত আধুনিক সেডান বা হ্যাচব্যাক গাড়িগুলো ১৫-২০ কি.মি./লিটার মাইলেজ দেয়। এসইউভি (SUV) গাড়িগুলো ১০-১৫ কি.মি./লিটার দিতে পারে। হাইব্রিড গাড়িগুলো আরও বেশি, প্রায় ২৫ কি.মি./লিটার পর্যন্ত মাইলেজ দিতে পারে।",
    faq2q: "বাইকের জন্য ভালো মাইলেজ কত?",
    faq2a: "কমিউটার মোটরসাইকেল (১০০-১৫০ সিসি) সাধারণত ৪৫-৬৫ কি.মি./লিটার মাইলেজ দেয়। বড় সিসির বাইকগুলো ২৫-৩৫ কি.মি./লিটার দিয়ে থাকে।",
    faq3q: "মাইলেজ কীভাবে হিসাব করবেন?",
    faq3a: "সাধারণ সূত্রটি হলো: মাইলেজ = অতিক্রান্ত দূরত্ব ÷ ব্যবহৃত জ্বালানী। উদাহরণস্বরূপ, যদি আপনি ১০ লিটার জ্বালানী দিয়ে ১৫০ কিলোমিটার যান, তাহলে আপনার মাইলেজ হবে ১৫০ / ১০ = ১৫ কি.মি./লিটার।",
    faq4q: "km/L এবং MPG এর মধ্যে পার্থক্য কী?",
    faq4a: "km/L মানে কিলোমিটার প্রতি লিটার (মেট্রিক পদ্ধতি) এবং MPG মানে মাইলস পার গ্যালন (ইম্পেরিয়াল পদ্ধতি)।",
    faq5q: "জ্বালানী দক্ষতা কীভাবে বাড়ানো যায়?",
    faq5a: "১. স্থির গতি বজায় রাখুন। ২. টায়ারে সঠিক বাতাস রাখুন। ৩. দ্রুত গতি বাড়ানো এবং হঠাৎ ব্রেক কষা এড়িয়ে চলুন। ৪. অতিরিক্ত ওজন কমান। ৫. নিয়মিত ইঞ্জিন মেইনটেন্যান্স করুন।",
    distUnit: "কি.মি.",
    fuelUnit: "লিটার",
    mpg: "এমপিজি",
    lPer100: "লিটার/১০০কি.মি."
  }
};

type LangType = "en" | "bn";
type CalcMode = "basic" | "fullTank" | "fuelCost" | "trip";

interface CalculationResult {
  id: string;
  timestamp: number;
  mode: CalcMode;
  vehicle: "car" | "motorcycle";
  distanceUnit: "km" | "mi";
  fuelUnit: "L" | "gal";
  data: any;
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
        <Calculator className="text-white w-5 h-5" />
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">MileageCalc</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Auto Tool</span>
      </div>
    </Link>
  );
}

export default function MileageCalculator() {
  const [lang, setLang] = useState<LangType>("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [vehicle, setVehicle] = useState<"car" | "motorcycle">("car");
  const [mode, setMode] = useState<CalcMode>("basic");
  
  const [distUnit, setDistUnit] = useState<"km" | "mi">("km");
  const [fuelUnit, setFuelUnit] = useState<"L" | "gal">("L");

  // Inputs
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [prevOdo, setPrevOdo] = useState("");
  const [curOdo, setCurOdo] = useState("");
  const [fuelFilled, setFuelFilled] = useState("");
  const [vehMileage, setVehMileage] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    // Load history
    try {
      const savedHistory = localStorage.getItem("mileageHistory");
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      
      // Removed language persistence so it always defaults to English.
      // const savedLang = localStorage.getItem("preferredLang");
      // if (savedLang === "bn" || savedLang === "en") setLang(savedLang);
    } catch (e) {}
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { }
  }, [theme]);

  const toggleLang = useCallback(() => {
    const next = lang === "en" ? "bn" : "en";
    setLang(next);
    try { localStorage.setItem("preferredLang", next); } catch { }
  }, [lang]);

  const saveToHistory = (newResult: CalculationResult) => {
    const updated = [newResult, ...history].slice(0, 10); // Keep last 10
    setHistory(updated);
    setResult(newResult);
    try { localStorage.setItem("mileageHistory", JSON.stringify(updated)); } catch { }
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  const handleCalculate = useCallback(() => {
    const resData: any = {};
    const kmConversion = distUnit === "km" ? 1 : 1.60934;
    const lConversion = fuelUnit === "L" ? 1 : 3.78541;

    let calcDistance = 0;
    let calcFuel = 0;

    if (mode === "basic") {
      calcDistance = Number(distance);
      calcFuel = Number(fuelUsed);
      if (!calcDistance || !calcFuel) return;
      
      const distKm = calcDistance * kmConversion;
      const fuelL = calcFuel * lConversion;
      const kmPl = distKm / fuelL;
      
      resData.mileage = calcDistance / calcFuel;
      resData.kmPl = kmPl;
      resData.mpg = kmPl * 2.35215;
      resData.lPer100 = 100 / kmPl;

    } else if (mode === "fullTank") {
      const cOdo = Number(curOdo);
      const pOdo = Number(prevOdo);
      calcFuel = Number(fuelFilled);
      if (!cOdo || !pOdo || !calcFuel || cOdo <= pOdo) return;
      
      calcDistance = cOdo - pOdo;
      const distKm = calcDistance * kmConversion;
      const fuelL = calcFuel * lConversion;
      const kmPl = distKm / fuelL;

      resData.distance = calcDistance;
      resData.mileage = calcDistance / calcFuel;
      resData.kmPl = kmPl;
      resData.mpg = kmPl * 2.35215;
      resData.lPer100 = 100 / kmPl;
      
    } else if (mode === "fuelCost" || mode === "trip") {
      calcDistance = Number(distance);
      const mil = Number(vehMileage); // mileage in current units
      const price = Number(fuelPrice);
      if (!calcDistance || !mil || !price) return;

      const totalFuelRequired = calcDistance / mil;
      const totalCost = totalFuelRequired * price;
      
      resData.totalFuel = totalFuelRequired;
      resData.totalCost = totalCost;
      resData.costPerDist = totalCost / calcDistance;

      if (mode === "trip") {
        resData.roundTripCost = totalCost * 2;
      }
    }

    const newResult: CalculationResult = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      mode,
      vehicle,
      distanceUnit: distUnit,
      fuelUnit: fuelUnit,
      data: resData
    };

    saveToHistory(newResult);
    setCopied(false);
  }, [mode, distance, fuelUsed, prevOdo, curOdo, fuelFilled, vehMileage, fuelPrice, distUnit, fuelUnit, vehicle, history]);

  const copyResult = useCallback(() => {
    if (!result) return;
    let text = `${t.results} - ${t.title}\n`;
    if (result.data.mileage) text += `${t.mileage}: ${result.data.mileage.toFixed(2)} ${result.distanceUnit}/${result.fuelUnit}\n`;
    if (result.data.totalCost) text += `${t.totalCost}: ${result.data.totalCost.toFixed(2)}\n`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }, [result, t]);

  const exportCSV = () => {
    if (history.length === 0) return;
    const header = "Date,Mode,Vehicle,Distance Unit,Fuel Unit,Details\n";
    const rows = history.map(h => {
      const date = new Date(h.timestamp).toLocaleDateString();
      const details = JSON.stringify(h.data).replace(/,/g, ";"); // prevent csv break
      return `${date},${h.mode},${h.vehicle},${h.distanceUnit},${h.fuelUnit},${details}`;
    }).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mileage_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearHistory = () => {
    setHistory([]);
    setResult(null);
    try { localStorage.removeItem("mileageHistory"); } catch {}
  };

  return (
    <main className="flex-1 px-4 py-8 sm:py-12 bg-zinc-50 dark:bg-[#0f1525]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
              {t.title}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CALCULATOR FORM */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none overflow-hidden">
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold mb-3">
                    {t.vehicleType}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setVehicle("car")}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${vehicle === "car" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" : "border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                    >
                      <Car className="w-8 h-8 mb-2" />
                      <span className="font-semibold text-sm">{t.car}</span>
                    </button>
                    <button
                      onClick={() => setVehicle("motorcycle")}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all ${vehicle === "motorcycle" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" : "border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                    >
                      <Bike className="w-8 h-8 mb-2" />
                      <span className="font-semibold text-sm">{t.motorcycle}</span>
                    </button>
                  </div>
                </div>

                {/* Units Toggle */}
                <div className="flex gap-4 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                   <div className="flex-1 flex gap-1">
                     <button onClick={() => setDistUnit("km")} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${distUnit === "km" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}`}>KM</button>
                     <button onClick={() => setDistUnit("mi")} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${distUnit === "mi" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}`}>Miles</button>
                   </div>
                   <div className="w-px bg-zinc-200 dark:bg-zinc-700 my-1"></div>
                   <div className="flex-1 flex gap-1">
                     <button onClick={() => setFuelUnit("L")} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${fuelUnit === "L" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}`}>Liters</button>
                     <button onClick={() => setFuelUnit("gal")} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${fuelUnit === "gal" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}`}>Gallons</button>
                   </div>
                </div>

                {/* Mode Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "basic", label: t.basic, icon: <Map className="w-4 h-4 mb-1" /> },
                    { id: "fullTank", label: t.fullTank, icon: <Fuel className="w-4 h-4 mb-1" /> },
                    { id: "fuelCost", label: t.fuelCost, icon: <Droplets className="w-4 h-4 mb-1" /> },
                    { id: "trip", label: t.tripCost, icon: <Banknote className="w-4 h-4 mb-1" /> }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setMode(m.id as CalcMode); setResult(null); }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg text-xs font-medium transition-all ${mode === m.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"}`}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Inputs */}
                <div className="space-y-4">
                  {mode === "basic" && (
                    <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.distance} ({distUnit})</label>
                        <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 150" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.fuelUsed} ({fuelUnit})</label>
                        <input type="number" value={fuelUsed} onChange={e => setFuelUsed(e.target.value)} placeholder="e.g. 10" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                    </div>
                  )}

                  {mode === "fullTank" && (
                    <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.prevOdo} ({distUnit})</label>
                        <input type="number" value={prevOdo} onChange={e => setPrevOdo(e.target.value)} placeholder="e.g. 15000" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.curOdo} ({distUnit})</label>
                        <input type="number" value={curOdo} onChange={e => setCurOdo(e.target.value)} placeholder="e.g. 15300" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.fuelFilled} ({fuelUnit})</label>
                        <input type="number" value={fuelFilled} onChange={e => setFuelFilled(e.target.value)} placeholder="e.g. 20" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                    </div>
                  )}

                  {(mode === "fuelCost" || mode === "trip") && (
                    <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="sm:col-span-2">
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.distance} ({distUnit})</label>
                        <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 150" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.vehicleMileage} ({distUnit}/{fuelUnit})</label>
                        <input type="number" value={vehMileage} onChange={e => setVehMileage(e.target.value)} placeholder={`e.g. ${vehicle === 'car' ? '15' : '45'}`} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">{t.fuelPrice}</label>
                        <input type="number" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} placeholder="e.g. 120" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center pt-2">
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 inline-block px-3 py-1.5 rounded-md border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
                    {mode === "basic" && "Formula: Mileage = Distance ÷ Fuel Used"}
                    {mode === "fullTank" && "Formula: Distance = Current Odo - Previous Odo | Mileage = Distance ÷ Fuel Filled"}
                    {mode === "fuelCost" && "Formula: Total Fuel = Distance ÷ Mileage | Total Cost = Total Fuel × Fuel Price"}
                    {mode === "trip" && "Formula: Required Fuel = Distance ÷ Mileage | Round Trip = Total Cost × 2"}
                  </p>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {t.calculate}
                </button>
              </div>
            </div>

            {/* RESULTS & HISTORY */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Results Card */}
              {result ? (
                <div className={`bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] rounded-2xl ${animate ? "animate-in zoom-in-95 duration-300" : ""}`}>
                  <div className="bg-white dark:bg-zinc-900 rounded-[15px] p-6 h-full shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-6 rounded-full bg-indigo-500 block"></span>
                        {t.results}
                      </h3>
                      <div className="flex gap-2">
                        <button onClick={copyResult} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title={t.copy}>
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: t.title, text: `My ${result.vehicle} calculation result.` });
                          }
                        }} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title={t.share}>
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {result.data.mileage && (
                        <div className="flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                          <div>
                            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{t.mileage}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Primary Efficiency</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{result.data.mileage.toFixed(2)}</span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1 font-medium">{result.distanceUnit}/{result.fuelUnit}</span>
                          </div>
                        </div>
                      )}

                      {result.data.mpg && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                            <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">{result.data.mpg.toFixed(1)}</p>
                            <p className="text-xs text-zinc-500 mt-1 uppercase font-semibold">{t.mpg}</p>
                          </div>
                          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                            <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">{result.data.lPer100.toFixed(2)}</p>
                            <p className="text-xs text-zinc-500 mt-1 uppercase font-semibold">{t.lPer100}</p>
                          </div>
                        </div>
                      )}

                      {result.data.totalFuel && (
                        <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                          <span className="text-zinc-600 dark:text-zinc-400">{t.totalFuel}</span>
                          <span className="font-semibold text-zinc-900 dark:text-white">{result.data.totalFuel.toFixed(2)} {result.fuelUnit}</span>
                        </div>
                      )}
                      
                      {result.data.totalCost && (
                        <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                          <span className="text-zinc-600 dark:text-zinc-400">{t.totalCost}</span>
                          <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{result.data.totalCost.toFixed(2)}</span>
                        </div>
                      )}

                      {result.data.costPerDist && (
                        <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                          <span className="text-zinc-600 dark:text-zinc-400">{t.costPer} {result.distanceUnit}</span>
                          <span className="font-semibold text-zinc-900 dark:text-white">{result.data.costPerDist.toFixed(2)}</span>
                        </div>
                      )}

                      {result.data.roundTripCost && (
                        <div className="flex justify-between items-center py-3 px-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 mt-2">
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{t.roundTripCost}</span>
                          <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">{result.data.roundTripCost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px] shadow-sm">
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="w-8 h-8 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-2">No Results Yet</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 max-w-xs">Fill in the inputs and click calculate to see your vehicle's metrics.</p>
                </div>
              )}

              {/* History */}
              <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/20">
                  <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                    {t.history}
                  </h3>
                  {history.length > 0 && (
                    <div className="flex gap-2">
                      <button onClick={exportCSV} className="p-1.5 text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors" title={t.exportCsv}>
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={clearHistory} className="p-1.5 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors" title={t.clearHistory}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {history.length === 0 ? (
                    <p className="text-center text-sm text-zinc-500 py-6">{t.noHistory}</p>
                  ) : (
                    <div className="space-y-2">
                      {history.map((h, i) => (
                        <div key={h.id} className="p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700 flex items-center justify-between cursor-pointer" onClick={() => setResult(h)}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                              {h.vehicle === "car" ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 capitalize">{translations[lang][h.mode as keyof typeof translations["en"]]}</p>
                              <p className="text-[10px] text-zinc-400">{new Date(h.timestamp).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {h.data.mileage && <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{h.data.mileage.toFixed(1)} <span className="text-[10px] font-normal text-zinc-500">{h.distanceUnit}/{h.fuelUnit}</span></p>}
                            {h.data.totalCost && <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{h.data.totalCost.toFixed(0)}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* HOW TO USE SECTION */}
          <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">{t.howToUseTitle}</h2>
            <div className="bg-indigo-50 dark:bg-indigo-500/10 p-6 sm:p-8 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm text-center">
              <p className="text-sm sm:text-base text-indigo-900 dark:text-indigo-200 leading-relaxed max-w-3xl mx-auto">
                {t.howToUseText}
              </p>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">{t.faqTitle}</h2>
            <div className="space-y-4">
              {[
                { q: t.faq1q, a: t.faq1a },
                { q: t.faq2q, a: t.faq2a },
                { q: t.faq3q, a: t.faq3a },
                { q: t.faq4q, a: t.faq4a },
                { q: t.faq5q, a: t.faq5a },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-2 flex items-start gap-3">
                    <span className="text-indigo-500 mt-0.5">Q:</span>
                    {faq.q}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
    </main>
  );
}

// Additional Icon for results
function Check(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
}
