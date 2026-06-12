import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0f1525] items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-10">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">All Your Calculations in One Place</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">Choose a calculator below to get started with precise and accurate measurements.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/age-calculator" className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
               </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Age Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Calculate your exact age in years, months, and days down to the minute.</p>
          </Link>
          
          <Link href="/bmi-calculator" className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
               </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">BMI Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Check your Body Mass Index (BMI) and discover your ideal healthy weight range.</p>
          </Link>

          <Link href="/standard-calculator" className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Standard Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">A basic calculator for quick and easy everyday math calculations.</p>
          </Link>

          <Link href="/currency-calculator" className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <path d="M10 9.5a2.5 2.5 0 0 1 5 0c0 1.5-5 1.5-5 3a2.5 2.5 0 0 0 5 0" />
               </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Currency Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Check live exchange rates and convert between global currencies.</p>
          </Link>

          <Link href="/truck-calculator" className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="14" height="6" rx="1" />
                  <path d="M16 13H22v-2l-2-4h-4v6z" />
                  <circle cx="6" cy="17" r="2" />
                  <circle cx="18" cy="17" r="2" />
               </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Truck Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Calculate exactly how much sand or soil your dump truck can carry.</p>
          </Link>

          <Link href="/area-calculator" className="group flex flex-col items-center p-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
               </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Area Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Calculate room and house area instantly in square feet and square meters.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
