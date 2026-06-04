"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

interface BMIResult {
  bmi: string;
  category: string;
  color: string;
  colorBg: string;
  healthyWeightMin: string;
  healthyWeightMax: string;
  suggestion: string;
  bfp?: string;
  bfpCategory?: string;
}

function calculateBMIMetric(weightKg: number, heightCm: number, age: number, gender: string): BMIResult | null {
  if (!weightKg || !heightCm) return null;
  const hM = heightCm / 100;
  const bmi = weightKg / (hM * hM);
  return getBMIDetails(bmi, hM, age, gender);
}

function calculateBMIImperial(weightLbs: number, heightFt: number, heightIn: number, age: number, gender: string): BMIResult | null {
  if (!weightLbs || (!heightFt && !heightIn)) return null;
  const hInches = heightFt * 12 + heightIn;
  const bmi = (703 * weightLbs) / (hInches * hInches);
  const hM = hInches * 0.0254; // convert to meters to calculate healthy range
  return getBMIDetails(bmi, hM, age, gender);
}

function getBMIDetails(bmi: number, heightMeters: number, age: number, gender: string): BMIResult {
  let category = "";
  let color = "";
  let colorBg = "";
  let suggestion = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-amber-500 dark:text-amber-400";
    colorBg = "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    suggestion = "You are considered underweight. It may be beneficial to consult a healthcare provider to determine if you need to gain weight safely.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Healthy Weight";
    color = "text-emerald-500 dark:text-emerald-400";
    colorBg = "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    suggestion = "You are in a healthy weight range for your height. Keep up the good work with a balanced diet and regular exercise!";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    color = "text-orange-500 dark:text-orange-400";
    colorBg = "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20";
    suggestion = "You are considered overweight. Losing a small amount of weight may improve your health and reduce risks of certain conditions.";
  } else {
    category = "Obesity";
    color = "text-red-500 dark:text-red-400";
    colorBg = "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";
    suggestion = "Your BMI falls into the obesity category. It is highly recommended to consult a doctor for a comprehensive health assessment and a tailored plan.";
  }

  // Healthy weight range (BMI 18.5 - 24.9)
  const minKgs = 18.5 * (heightMeters * heightMeters);
  const maxKgs = 24.9 * (heightMeters * heightMeters);

  let bfpStr;
  let bfpCat = "";
  if (age > 0 && gender !== "none") {
    const genderVal = gender === "male" ? 1 : 0;
    const bfp = (1.20 * bmi) + (0.23 * age) - (10.8 * genderVal) - 5.4;
    bfpStr = bfp.toFixed(1);
    
    if (gender === "male") {
      if (bfp < 6) bfpCat = "Essential Fat";
      else if (bfp <= 13) bfpCat = "Athletes";
      else if (bfp <= 17) bfpCat = "Fitness";
      else if (bfp <= 24) bfpCat = "Average";
      else bfpCat = "Obese";
    } else {
      if (bfp < 14) bfpCat = "Essential Fat";
      else if (bfp <= 20) bfpCat = "Athletes";
      else if (bfp <= 24) bfpCat = "Fitness";
      else if (bfp <= 31) bfpCat = "Average";
      else bfpCat = "Obese";
    }
  }

  return {
    bmi: bmi.toFixed(1),
    category,
    color,
    colorBg,
    healthyWeightMin: minKgs.toFixed(1),
    healthyWeightMax: maxKgs.toFixed(1),
    suggestion,
    bfp: bfpStr,
    bfpCategory: bfpCat
  };
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/10 group-hover:scale-105 transition-transform">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">BMICalc</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Health Tool</span>
      </div>
    </Link>
  );
}

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  
  const [weightKg, setWeightKg] = useState<string>("70");
  const [heightCm, setHeightCm] = useState<string>("170");
  
  const [weightLbs, setWeightLbs] = useState<string>("150");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("7");
  
  const [age, setAge] = useState<string>("25");
  const [gender, setGender] = useState<string>("male");

  const [result, setResult] = useState<BMIResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [animate, setAnimate] = useState(false);

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

  const handleCalculate = useCallback(() => {
    let r = null;
    if (unit === "metric") {
      r = calculateBMIMetric(Number(weightKg), Number(heightCm), Number(age) || 0, gender);
    } else {
      r = calculateBMIImperial(Number(weightLbs), Number(heightFt), Number(heightIn), Number(age) || 0, gender);
    }
    setResult(r);
    setCopied(false);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  }, [unit, weightKg, heightCm, weightLbs, heightFt, heightIn, age, gender]);

  const copyResult = useCallback(() => {
    if (!result) return;
    const text = `My BMI is ${result.bmi} (${result.category}).`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 dark:bg-[#0f1525]">
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-[#0f1525]/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/standard-calculator" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hidden sm:block">
              Standard Calculator
            </Link>
            <Link href="/age-calculator" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hidden sm:block">
              Age Calculator
            </Link>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">BMI Calculator</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Calculate your Body Mass Index and ideal weight
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5">
              <div className="space-y-6">
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${unit === "imperial" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                  >
                    Imperial (lbs/ft)
                  </button>
                  <button
                    onClick={() => setUnit("metric")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${unit === "metric" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                  >
                    Metric (kg/cm)
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium">Gender (Optional)</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="none">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {unit === "metric" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium">Height (cm)</label>
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        placeholder="e.g. 175"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium">Weight (kg)</label>
                      <input
                        type="number"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        placeholder="e.g. 70"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium">Height (ft & in)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            value={heightFt}
                            onChange={(e) => setHeightFt(e.target.value)}
                            placeholder="ft"
                            className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                          />
                          <span className="absolute right-3 top-2.5 text-xs text-zinc-400">ft</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            value={heightIn}
                            onChange={(e) => setHeightIn(e.target.value)}
                            placeholder="in"
                            className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                          />
                          <span className="absolute right-3 top-2.5 text-xs text-zinc-400">in</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-medium">Weight (lbs)</label>
                      <input
                        type="number"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(e.target.value)}
                        placeholder="e.g. 150"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCalculate}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-emerald-500/20"
                >
                  Calculate BMI
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              {!result && (
                <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-10 text-center min-h-[300px]">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    <p className="text-sm text-zinc-400 dark:text-zinc-600">Enter your height and weight to calculate BMI</p>
                  </div>
                </div>
              )}

              {result && (
                <div className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm overflow-hidden ${animate ? "animate-fade-in-up" : ""}`}>
                  <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-3.5 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Your BMI Results
                    </h2>
                    <button
                      onClick={copyResult}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <div className="p-5 space-y-5">
                    <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex flex-col items-center justify-center shrink-0">
                        <span className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 tabular-nums tracking-tight">
                          {result.bmi}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-widest font-semibold">BMI Score</span>
                      </div>
                      
                      <div className={`flex-1 w-full flex items-center justify-center sm:justify-start px-5 py-3 rounded-lg border ${result.colorBg}`}>
                        <span className={`text-lg font-bold tracking-wide ${result.color}`}>
                          {result.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 space-y-3">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0 mt-0.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>
                        <div>
                          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Ideal Weight Range</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Based on your height, your healthy weight range is <strong className="text-zinc-700 dark:text-zinc-300">{result.healthyWeightMin} - {result.healthyWeightMax} kg</strong> (or equivalent in lbs). This corresponds to a BMI between 18.5 and 24.9.</p>
                        </div>
                      </div>
                    </div>

                    {result.bfp && (
                      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 space-y-3">
                        <div className="flex items-start gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
                          <div>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Estimated Body Fat</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Based on your BMI, Age, and Gender, your estimated body fat percentage is <strong className="text-zinc-700 dark:text-zinc-300">{result.bfp}%</strong> ({result.bfpCategory}).</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50/50 dark:bg-zinc-800/20 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                      {result.suggestion}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 space-y-8 max-w-4xl mx-auto">
            <section className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold">1</span>
                What is BMI?
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Body Mass Index (BMI) is a simple mathematical formula used to estimate body fat based on a person's weight and height. It is widely used by healthcare professionals as a quick screening tool to categorize individuals into different weight classes, such as underweight, healthy weight, overweight, and obesity. While it doesn't directly measure body fat, it provides a reliable indicator for most people.
              </p>
            </section>
            
            <section className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold">2</span>
                How is BMI Calculated?
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                The BMI calculation is quite straightforward. It divides your weight by the square of your height. The formulas differ slightly depending on whether you use the metric or imperial system:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
                  <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Metric Formula</h3>
                  <code className="text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 shadow-sm block text-center">
                    Weight (kg) ÷ [Height (m)]²
                  </code>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
                  <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Imperial Formula</h3>
                  <code className="text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 shadow-sm block text-center">
                    (Weight (lbs) ÷ [Height (in)]²) × 703
                  </code>
                </div>
              </div>
            </section>
            
            <section className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-5 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold">3</span>
                BMI Categories and Health Implications
              </h2>
              <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">BMI Range</th>
                      <th className="py-3 px-4 font-semibold hidden sm:table-cell">Health Implications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-zinc-600 dark:text-zinc-400">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-amber-600 dark:text-amber-500">Underweight</td>
                      <td className="py-3 px-4 font-medium">Below 18.5</td>
                      <td className="py-3 px-4 hidden sm:table-cell">May indicate malnutrition or other health problems.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-emerald-600 dark:text-emerald-500">Healthy Weight</td>
                      <td className="py-3 px-4 font-medium">18.5 - 24.9</td>
                      <td className="py-3 px-4 hidden sm:table-cell">Lowest risk of weight-related diseases.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-orange-600 dark:text-orange-500">Overweight</td>
                      <td className="py-3 px-4 font-medium">25.0 - 29.9</td>
                      <td className="py-3 px-4 hidden sm:table-cell">Increased risk of cardiovascular disease.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-red-600 dark:text-red-500">Obesity</td>
                      <td className="py-3 px-4 font-medium">30.0+</td>
                      <td className="py-3 px-4 hidden sm:table-cell">Significantly higher risk of severe health conditions.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-5 text-xs text-zinc-500 dark:text-zinc-500 italic">
                Note: BMI does not diagnose the body fatness or health of an individual. Athletes with high muscle mass may have a high BMI without having high body fat.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
