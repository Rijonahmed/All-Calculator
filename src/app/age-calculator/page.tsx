"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getToday(): { y: number; m: number; d: number } {
  const t = new Date();
  return { y: t.getFullYear(), m: t.getMonth(), d: t.getDate() };
}

function countLeapBirthdays(by: number, ry: number, rm: number, rd: number): number {
  let count = 0;
  for (let y = by + 1; y <= ry; y++) {
    if (isLeapYear(y)) {
      if (y < ry || rm > 1 || (rm === 1 && rd >= 29)) count++;
    }
  }
  return count;
}

interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  nextBDIn: number;
  nextBDDate: string;
  isLeapBaby: boolean;
  leapBirthdays: number;
}

function calcAge(by: number, bm: number, bd: number, ry: number, rm: number, rd: number): AgeBreakdown | null {
  if (by > ry || (by === ry && (bm > rm || (bm === rm && bd > rd)))) return null;

  const isLeapBaby = bm === 1 && bd === 29;

  const bDayAdj = isLeapBaby && !isLeapYear(ry) ? 28 : bd;
  const birthdayPassed = rm > bm || (rm === bm && rd >= bDayAdj);

  const lastBY = birthdayPassed ? ry : ry - 1;
  const isLastBLeap = isLeapYear(lastBY);
  const lastBD = isLeapBaby ? (isLastBLeap ? 29 : 28) : bd;

  const years = lastBY - by;

  let months = rm - bm;
  let days = rd - lastBD;
  if (days < 0) {
    months--;
    days += daysInMonth(ry, rm - 1);
  }
  if (months < 0) months += 12;

  const birthD = new Date(by, bm, bd);
  const refD = new Date(ry, rm, rd);
  const diffMs = refD.getTime() - birthD.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  const nextBDYear = birthdayPassed ? ry + 1 : ry;
  const isNBLeap = isLeapYear(nextBDYear);
  const nbd = isLeapBaby ? (isNBLeap ? 29 : 28) : bd;
  const nextBD = new Date(nextBDYear, bm, nbd);
  const nextBDIn = Math.ceil((nextBD.getTime() - refD.getTime()) / (1000 * 60 * 60 * 24));
  const nextBDDate = nextBD.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const leapBirthdays = isLeapBaby ? countLeapBirthdays(by, ry, rm, rd) : 0;

  return {
    years, months, days,
    hours: Math.floor(diffMs % 86400000 / 3600000),
    minutes: Math.floor(diffMs % 3600000 / 60000),
    totalDays, totalWeeks, totalMonths, totalHours, totalMinutes,
    nextBDIn, nextBDDate, isLeapBaby, leapBirthdays,
  };
}

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 151 }, (_, i) => currentYear - i);
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => i + 1);

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 group-hover:scale-105 transition-transform">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <text x="12" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">&#x221E;</text>
        </svg>
      </div>
      <div className="leading-tight">
        <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white">AgeCalc</span>
        <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">Precision Tool</span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [bMonth, setBMonth] = useState(0);
  const [bDay, setBDay] = useState(1);
  const [bYear, setBYear] = useState(1990);

  const [rMonth, setRMonth] = useState(0);
  const [rDay, setRDay] = useState(1);
  const [rYear, setRYear] = useState(0);

  const [result, setResult] = useState<AgeBreakdown | null>(null);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    const t = getToday();
    setRYear(t.y); setRMonth(t.m); setRDay(t.d);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { }
  }, [theme]);

  const bMaxDay = useMemo(() => daysInMonth(bYear, bMonth), [bYear, bMonth]);
  const rMaxDay = useMemo(() => daysInMonth(rYear, rMonth), [rYear, rMonth]);

  useEffect(() => {
    if (bDay > bMaxDay) setBDay(bMaxDay);
  }, [bMaxDay, bDay]);
  useEffect(() => {
    if (rDay > rMaxDay) setRDay(rMaxDay);
  }, [rMaxDay, rDay]);

  const handleCalculate = useCallback(() => {
    const r = calcAge(bYear, bMonth, bDay, rYear, rMonth, rDay);
    setResult(r);
    setCopied(false);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  }, [bYear, bMonth, bDay, rYear, rMonth, rDay]);

  const setToday = useCallback(() => {
    const t = getToday();
    setRYear(t.y); setRMonth(t.m); setRDay(t.d);
  }, []);

  const shareText = useCallback(() => {
    if (!result) return;
    const lines = [
      "Age Calculator Result",
      result.isLeapBaby ? "★ Born on Feb 29 — a leap day baby!" : "",
      "",
      `${result.years} years, ${result.months} months, ${result.days} days`,
      `Total: ${result.totalDays.toLocaleString()} days · ${result.totalWeeks.toLocaleString()} weeks`,
      `Next birthday: ${result.nextBDDate} (in ${result.nextBDIn} days)`,
    ].filter(Boolean);
    const text = lines.join("\n");
    if (navigator.share && navigator.canShare?.({ text })) {
      navigator.share({ text }).catch(() => { });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true); setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [result]);

  const copyResult = useCallback(() => {
    if (!result) return;
    const parts = [
      `I am ${result.years} years, ${result.months} months, and ${result.days} days old.`,
      `Total: ${result.totalDays.toLocaleString()} days (${result.totalWeeks.toLocaleString()} weeks, ${result.totalMonths} months).`,
    ];
    if (result.isLeapBaby) {
      parts.push(`Born on Feb 29 — I've had ${result.leapBirthdays} actual leap day birthdays!`);
    }
    parts.push(`Next birthday is ${result.nextBDDate} (in ${result.nextBDIn} days).`);
    navigator.clipboard.writeText(parts.join(" ")).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  return (
    <main className="flex-1 px-4 py-8 sm:py-12 bg-zinc-50 dark:bg-[#0f1525]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">Age Calculator</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Calculate your exact age in years, months, days, and more
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5">
              <div className="space-y-5">
                <fieldset>
                  <legend className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    Date of Birth
                  </legend>
                  <DateSelects
                    month={bMonth} day={bDay} year={bYear}
                    onMonth={setBMonth} onDay={setBDay} onYear={setBYear}
                    mDay={bMaxDay}
                  />
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    Age at the Date of
                  </legend>
                  <DateSelects
                    month={rMonth} day={rDay} year={rYear}
                    onMonth={setRMonth} onDay={setRDay} onYear={setRYear}
                    mDay={rMaxDay}
                    showToday
                    onToday={setToday}
                  />
                </fieldset>

                <button
                  onClick={handleCalculate}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Calculate
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              {!result && (
                <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-10 text-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <p className="text-sm text-zinc-400 dark:text-zinc-600">Enter a date and click Calculate</p>
                  </div>
                </div>
              )}

              {result && (
                <div className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm overflow-hidden ${animate ? "animate-fade-in-up" : ""}`}>
                  <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-3.5 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Your Age Results
                    </h2>
                    <div className="flex gap-1.5">
                      <button
                        onClick={copyResult}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={shareText}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                        Share
                      </button>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    <div className="grid grid-cols-3 gap-2.5">
                      <BigStat value={result.years} label="Years" />
                      <BigStat value={result.months} label="Months" />
                      <BigStat value={result.days} label="Days" />
                    </div>

                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-100 dark:border-zinc-800">
                          <th className="text-left py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Breakdown</th>
                          <th className="text-right py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Row label="Years, Months, Days" value={`${result.years}y ${result.months}m ${result.days}d`} />
                        <Row label="Months" value={`${result.totalMonths.toLocaleString()} months`} />
                        <Row label="Weeks" value={`${result.totalWeeks.toLocaleString()} weeks`} />
                        <Row label="Days" value={`${result.totalDays.toLocaleString()} days`} />
                        <Row label="Hours" value={`${result.totalHours.toLocaleString()} hours`} />
                        <Row label="Minutes" value={`${result.totalMinutes.toLocaleString()} minutes`} />
                      </tbody>
                    </table>

                    {result.isLeapBaby && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 text-amber-800 dark:text-amber-300 text-sm border border-amber-200 dark:border-amber-900">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2 1 2 1 1-1 2-1 2 1 2 1 1-1 2-1 2 1 2 1 1-1 2-1 2 1 2 1" /><path d="M2 21h20" /><path d="M12 3v5" /><path d="M10 5h4" /></svg>
                          <span>Born on <strong>February 29</strong> — a leap day baby!</span>
                        </div>
                        <div className="px-4 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 text-sm border border-indigo-100 dark:border-indigo-900 flex items-center gap-2.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                          <span>
                            You've had <strong className="text-lg">{result.leapBirthdays}</strong> actual leap day {result.leapBirthdays === 1 ? "birthday" : "birthdays"} &mdash; one every 4 years!
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/10 border border-blue-100 dark:border-blue-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        <span className="font-semibold">Next birthday:</span>{" "}
                        {result.nextBDDate}{" "}
                        <span className="font-medium">(in {result.nextBDIn} day{result.nextBDIn !== 1 ? "s" : ""})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-xs text-zinc-400 dark:text-zinc-600 leading-relaxed max-w-3xl">
            <p className="mb-2">
              The age of a person can be counted differently in different cultures. This calculator is based on the most common age system. In this system, age increases on a person's birthday. For example, the age of a person who has lived for 3 years and 11 months is 3, and their age will increase to 4 on their next birthday one month later. Most western countries use this age system.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-400 dark:text-zinc-600">
            <span>&copy; {currentYear} AgeCalc</span>
          </div>
        </div>
    </main>
  );
}

function DateSelects({ month, day, year, onMonth, onDay, onYear, mDay, showToday, onToday }: {
  month: number; day: number; year: number;
  onMonth: (v: number) => void; onDay: (v: number) => void; onYear: (v: number) => void;
  mDay: number; showToday?: boolean; onToday?: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1">Month</label>
          <select
            value={month}
            onChange={(e) => onMonth(Number(e.target.value))}
            className="w-full px-2.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 cursor-pointer"
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1">Day</label>
          <select
            value={Math.min(day, mDay)}
            onChange={(e) => onDay(Number(e.target.value))}
            className="w-full px-2.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 cursor-pointer"
          >
            {DAY_OPTIONS.slice(0, mDay).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-400 dark:text-zinc-500 mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => onYear(Number(e.target.value))}
            className="w-full px-2.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 cursor-pointer"
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      {showToday && onToday && (
        <button
          onClick={onToday}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          &#8592; Today
        </button>
      )}
    </div>
  );
}

function BigStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
      <span className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100 tabular-nums">{value}</span>
      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-zinc-50 dark:border-zinc-800/50 last:border-0">
      <td className="py-2 text-zinc-600 dark:text-zinc-400">{label}</td>
      <td className="py-2 text-right font-medium text-zinc-800 dark:text-zinc-200 tabular-nums">{value}</td>
    </tr>
  );
}
