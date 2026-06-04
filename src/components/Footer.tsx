import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white dark:bg-[#0f1525] border-t border-zinc-200/60 dark:border-zinc-800/60 py-8 mt-auto z-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            &copy; {currentYear} Precision Tools.
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            Home
          </Link>
          <Link href="/age-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Age Calculator
          </Link>
          <Link href="/bmi-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            BMI Calculator
          </Link>
          <Link href="/standard-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Standard Calculator
          </Link>
          <Link href="/currency-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Currency Calculator
          </Link>
          <Link href="/truck-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
            Truck Calculator
          </Link>
        </div>
      </div>
    </footer>
  );
}
