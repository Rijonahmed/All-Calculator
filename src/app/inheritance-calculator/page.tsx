"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Country, LawType, USState, EstateInput, FamilyInput, CalculationResult } from "@/lib/inheritance/types";
import { calculateInheritance } from "@/lib/inheritance/engine";
import { inheritanceTranslations } from "./translations";

import { Step1Country } from "./components/Step1Country";
import { Step2Law } from "./components/Step2Law";
import { Step3Estate } from "./components/Step3Estate";
import { Step4Family } from "./components/Step4Family";
import { Step5Results } from "./components/Step5Results";

const defaultEstate: EstateInput = {
  landSize: 0, landValue: 0, houseValue: 0, cashValue: 0, goldValue: 0, businessValue: 0, otherValue: 0,
  debts: 0, funeralExpenses: 0, taxes: 0
};

const defaultFamily: FamilyInput = {
  husbands: 0, wives: 0, sons: 0, daughters: 0,
  fatherAlive: false, motherAlive: false, grandfatherAlive: false, grandmotherAlive: false,
  brothers: 0, sisters: 0, uncles: 0, aunts: 0
};

export default function InheritanceCalculator() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  
  const [country, setCountry] = useState<Country | null>(null);
  const [law, setLaw] = useState<LawType | null>(null);
  const [usState, setUsState] = useState<USState | null>(null);
  const [estate, setEstate] = useState<EstateInput>(defaultEstate);
  const [family, setFamily] = useState<FamilyInput>(defaultFamily);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const t = inheritanceTranslations[lang];

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? "dark" : "light");
    try {
      // Intentionally not saving lang to force English by default
      // but we can support toggling within the session
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { }
  }, [theme]);

  const toggleLang = useCallback(() => {
    setLang(l => l === "en" ? "bn" : "en");
  }, []);

  const handleNextStep = (nextStep: number) => {
    setStep(nextStep);
    setMaxStep(prev => Math.max(prev, nextStep));
  };

  const handleStepClick = (s: number) => {
    if (s <= maxStep) {
      setStep(s);
    }
  };

  const handleCalculate = () => {
    if (!country || !law) return;
    const res = calculateInheritance(country, law, estate, family, usState || undefined);
    setResult(res);
    handleNextStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setMaxStep(1);
    setCountry(null);
    setLaw(null);
    setUsState(null);
    setEstate(defaultEstate);
    setFamily(defaultFamily);
    setResult(null);
  };

  const stepsList = [
    { num: 1, label: t.step1 },
    { num: 2, label: t.step2 },
    { num: 3, label: t.step3 },
    { num: 4, label: t.step4 },
    { num: 5, label: t.step5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0f1525] print:bg-white transition-colors duration-300">
      <header className="pt-8 pb-4 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {t.backHome}
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              {lang === "en" ? "EN" : "BN"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Clickable Step Indicator */}
          <div className="mb-12 print:hidden flex items-center justify-center overflow-x-auto pb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              {stepsList.map((s, idx) => (
                <div key={s.num} className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => handleStepClick(s.num)}
                    disabled={s.num > maxStep}
                    className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      step === s.num
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105"
                        : s.num <= maxStep
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 hover:bg-indigo-200 cursor-pointer"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed"
                    }`}
                  >
                    <span className="hidden sm:inline mr-2">{s.num}.</span> {s.label}
                  </button>
                  {idx < stepsList.length - 1 && (
                    <div className={`h-1 w-4 sm:w-8 rounded-full ${s.num < maxStep ? "bg-indigo-300 dark:bg-indigo-500/50" : "bg-zinc-200 dark:bg-zinc-800"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && <Step1Country value={country} onChange={c => {setCountry(c); setLaw(null); handleNextStep(2);}} onNext={() => setStep(2)} t={t} />}
          {step === 2 && country && <Step2Law country={country} law={law} state={usState} onLawChange={setLaw} onStateChange={setUsState} onNext={() => handleNextStep(3)} onBack={() => setStep(1)} t={t} />}
          {step === 3 && <Step3Estate estate={estate} onChange={setEstate} onNext={() => handleNextStep(4)} onBack={() => setStep(2)} t={t} />}
          {step === 4 && <Step4Family family={family} onChange={setFamily} onNext={handleCalculate} onBack={() => setStep(3)} t={t} />}
          {step === 5 && <Step5Results result={result} onReset={handleReset} t={t} />}

          {/* HOW TO USE SECTION */}
          <div className="mt-24 pt-10 border-t border-zinc-200 dark:border-zinc-800 max-w-4xl mx-auto print:hidden">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">{t.howToUseTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: t.howToUse1Title, d: t.howToUse1Desc },
                { t: t.howToUse2Title, d: t.howToUse2Desc },
                { t: t.howToUse3Title, d: t.howToUse3Desc },
                { t: t.howToUse4Title, d: t.howToUse4Desc },
                { t: t.howToUse5Title, d: t.howToUse5Desc }
              ].map((step, index) => (
                <div key={index} className="bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">{step.t}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mt-24 pt-10 border-t border-zinc-200 dark:border-zinc-800 max-w-4xl mx-auto print:hidden">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">{t.faqTitle}</h2>
            <div className="space-y-4">
              {[
                { q: t.faq1q, a: t.faq1a },
                { q: t.faq2q, a: t.faq2a },
                { q: t.faq3q, a: t.faq3a },
                { q: t.faq4q, a: t.faq4a },
                { q: t.faq5q, a: t.faq5a }
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-2 flex items-start gap-3">
                    <span className="text-indigo-500 mt-0.5">Q:</span>{faq.q}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
