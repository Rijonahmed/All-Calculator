"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20 dark:shadow-violet-500/10 group-hover:scale-105 transition-transform">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="14.01" />
          <line x1="12" y1="14" x2="12" y2="14.01" />
          <line x1="8" y1="14" x2="8" y2="14.01" />
          <line x1="16" y1="18" x2="16" y2="18.01" />
          <line x1="12" y1="18" x2="12" y2="18.01" />
          <line x1="8" y1="18" x2="8" y2="18.01" />
          <line x1="16" y1="10" x2="16" y2="10.01" />
          <line x1="12" y1="10" x2="12" y2="10.01" />
          <line x1="8" y1="10" x2="8" y2="10.01" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">CalcTool</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Standard</span>
      </div>
    </Link>
  );
}

export default function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : NaN;
      default: return b;
    }
  };

  const handleNum = (numStr: string) => {
    if (waitingForNewValue) {
      setDisplay(numStr);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? numStr : display + numStr);
    }
  };

  const handleDot = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOp = (nextOp: string) => {
    const inputValue = parseFloat(display);
    
    if (prevValue === null) {
      if (!isNaN(inputValue)) {
        setPrevValue(inputValue);
        setEquation(`${inputValue} ${nextOp}`);
      }
    } else if (operator) {
      if (waitingForNewValue) {
        setOperator(nextOp);
        setEquation(`${prevValue} ${nextOp}`);
        return;
      }
      const currentValue = inputValue || 0;
      const newValue = calculate(prevValue, currentValue, operator);
      
      setDisplay(String(newValue));
      setPrevValue(newValue);
      setEquation(`${newValue} ${nextOp}`);
    }

    setWaitingForNewValue(true);
    setOperator(nextOp);
  };

  const handleEqual = () => {
    if (!operator || prevValue === null) return;
    
    const inputValue = parseFloat(display);
    const newValue = calculate(prevValue, inputValue, operator);
    
    setDisplay(String(newValue));
    setEquation(`${prevValue} ${operator} ${inputValue} =`);
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setEquation("");
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (/[0-9]/.test(key)) handleNum(key);
      else if (key === ".") handleDot();
      else if (key === "+" || key === "-") handleOp(key);
      else if (key === "*" || key === "x") handleOp("×");
      else if (key === "/") { e.preventDefault(); handleOp("÷"); }
      else if (key === "Enter" || key === "=") { e.preventDefault(); handleEqual(); }
      else if (key === "Backspace") handleDelete();
      else if (key === "Escape") handleClear();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, prevValue, operator, waitingForNewValue]);

  const btnClasses = "h-16 rounded-2xl text-xl font-medium transition-all active:scale-95 flex items-center justify-center";
  const numClasses = `${btnClasses} bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700`;
  const opClasses = `${btnClasses} bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 hover:bg-violet-200 dark:hover:bg-violet-800/40`;
  const actionClasses = `${btnClasses} bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-600`;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 dark:bg-[#0f1525]">
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-[#0f1525]/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/age-calculator" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hidden sm:block">
              Age Calculator
            </Link>
            <Link href="/bmi-calculator" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hidden sm:block">
              BMI Calculator
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

      <main className="flex-1 px-4 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">Standard Calculator</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Quick and easy arithmetic calculations
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6">
            
            {/* Display */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-5 mb-6 text-right border border-zinc-100 dark:border-zinc-700/50">
              <div className="text-zinc-400 dark:text-zinc-500 text-sm h-6 font-medium mb-1 truncate">
                {equation}
              </div>
              <div className="text-4xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight truncate">
                {display}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-3">
              <button onClick={handleClear} className={`${actionClasses} col-span-2 text-red-500 dark:text-red-400 font-bold`}>AC</button>
              <button onClick={handleDelete} className={actionClasses}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
              </button>
              <button onClick={() => handleOp("÷")} className={opClasses}>÷</button>

              <button onClick={() => handleNum("7")} className={numClasses}>7</button>
              <button onClick={() => handleNum("8")} className={numClasses}>8</button>
              <button onClick={() => handleNum("9")} className={numClasses}>9</button>
              <button onClick={() => handleOp("×")} className={opClasses}>×</button>

              <button onClick={() => handleNum("4")} className={numClasses}>4</button>
              <button onClick={() => handleNum("5")} className={numClasses}>5</button>
              <button onClick={() => handleNum("6")} className={numClasses}>6</button>
              <button onClick={() => handleOp("-")} className={opClasses}>−</button>

              <button onClick={() => handleNum("1")} className={numClasses}>1</button>
              <button onClick={() => handleNum("2")} className={numClasses}>2</button>
              <button onClick={() => handleNum("3")} className={numClasses}>3</button>
              <button onClick={() => handleOp("+")} className={opClasses}>+</button>

              <button onClick={() => handleNum("0")} className={`${numClasses} col-span-2`}>0</button>
              <button onClick={handleDot} className={numClasses}>.</button>
              <button onClick={handleEqual} className={`${opClasses} bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-600 dark:text-white dark:hover:bg-violet-700 border-none shadow-md shadow-violet-500/30`}>=</button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
