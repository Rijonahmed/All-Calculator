import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white dark:bg-[#0f1525] border-t border-zinc-200/60 dark:border-zinc-800/60 py-10 mt-auto z-10 print:hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-10">
        
        {/* Top Section: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl">
          <Link href="/" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            About
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
          <Link href="/inheritance-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            Inheritance Calculator
          </Link>
          <Link href="/mileage-calculator" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Mileage Calculator
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl h-px bg-zinc-200 dark:bg-zinc-800/80"></div>

        {/* Bottom Section: Branding & Developer Credit */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-6 text-center md:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 dark:text-zinc-400">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="font-extrabold tracking-tight text-zinc-800 dark:text-zinc-200 text-lg leading-tight">Precision Tools</p>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mt-0.5 uppercase tracking-wider">All-in-one Calculators</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <p>&copy; {currentYear} Precision Tools. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span className="text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest">&lt;/&gt;</span> 
              Development by <span className="text-zinc-800 dark:text-zinc-200 font-bold">Rijon Ahmed</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
