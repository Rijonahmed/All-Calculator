"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";

const POPULAR_CURRENCIES = [
  "USD", "EUR", "GBP", "BDT", "INR", "AUD", "CAD", 
  "SGD", "AED", "SAR", "JPY", "CNY", "MYR", "KWD"
];

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", BDT: "Bangladeshi Taka",
  INR: "Indian Rupee", AUD: "Australian Dollar", CAD: "Canadian Dollar",
  SGD: "Singapore Dollar", AED: "UAE Dirham", SAR: "Saudi Riyal",
  JPY: "Japanese Yen", CNY: "Chinese Yuan", MYR: "Malaysian Ringgit",
  KWD: "Kuwaiti Dinar", PKR: "Pakistani Rupee", QAR: "Qatari Rial",
  OMR: "Omani Rial", BHD: "Bahraini Dinar", BND: "Brunei Dollar",
  ZAR: "South African Rand", NZD: "New Zealand Dollar", CHF: "Swiss Franc"
};

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 dark:shadow-amber-500/10 group-hover:scale-105 transition-transform">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <path d="M10 9.5a2.5 2.5 0 0 1 5 0c0 1.5-5 1.5-5 3a2.5 2.5 0 0 0 5 0" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">CurrencyCalc</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Finance Tool</span>
      </div>
    </Link>
  );
}

export default function CurrencyCalculator() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<string[]>(POPULAR_CURRENCIES);
  
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    // Fetch rates
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setRates(data.rates);
          const allCurrencies = Object.keys(data.rates);
          // Put popular ones first, then the rest alphabetically
          const others = allCurrencies.filter(c => !POPULAR_CURRENCIES.includes(c)).sort();
          setCurrencies([...POPULAR_CURRENCIES, ...others]);
          setLoading(false);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch(() => {
        setError("Failed to load exchange rates. Please check your internet connection.");
        setLoading(false);
      });
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { }
  }, [theme]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getRate = (from: string, to: string) => {
    if (!rates[from] || !rates[to]) return 0;
    // Base is USD, so to convert From -> To:
    // (1 / rate of From) * rate of To
    return rates[to] / rates[from];
  };

  const exchangeRate = getRate(fromCurrency, toCurrency);
  const convertedAmount = amount ? (parseFloat(amount) * exchangeRate) : 0;
  
  const formatCurrency = (val: number, cur: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(val);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 dark:bg-[#0f1525]">
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-[#0f1525]/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/standard-calculator" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hidden sm:block">
              Standard Calc
            </Link>
            <Link href="/bmi-calculator" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hidden sm:block">
              BMI Calc
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">Currency Converter</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Live exchange rates for global currencies
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-4 sm:p-10">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-900/50">
                {error}
              </div>
            )}

            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-6 items-end">
              {/* From Amount */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full text-lg sm:text-3xl font-medium bg-transparent border-b-2 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-500 pb-1 sm:pb-2 outline-none text-zinc-800 dark:text-zinc-100 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">From</label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all cursor-pointer"
                  >
                    {currencies.map(code => (
                      <option key={`from-${code}`} value={code}>
                        {code} - {CURRENCY_NAMES[code] || "Currency"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:pb-[3px]">
                <button 
                  onClick={handleSwap}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
                  aria-label="Swap currencies"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 w-3.5 h-3.5"><path d="M7 10v12"/><path d="M15 10v12"/><path d="M7 22l-4-4"/><path d="M15 22l4-4"/><path d="M7 2l4 4"/><path d="M15 2l-4 4"/></svg>
                </button>
              </div>

              {/* To Currency */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Converted</label>
                  <div className="w-full text-lg sm:text-3xl font-semibold border-b-2 border-transparent pb-1 sm:pb-2 text-zinc-800 dark:text-zinc-100 overflow-hidden text-ellipsis whitespace-nowrap">
                    {loading ? (
                      <span className="animate-pulse text-zinc-300 dark:text-zinc-700">Loading...</span>
                    ) : (
                      formatCurrency(convertedAmount, toCurrency)
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">To</label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all cursor-pointer"
                  >
                    {currencies.map(code => (
                      <option key={`to-${code}`} value={code}>
                        {code} - {CURRENCY_NAMES[code] || "Currency"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            {!loading && !error && (
              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </p>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Live rates provided by ExchangeRate-API
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
