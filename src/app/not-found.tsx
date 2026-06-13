import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 min-h-[80vh] items-center justify-center bg-zinc-50 dark:bg-[#0f1525] p-4">
      <div className="max-w-md w-full relative z-10 group">
        
        {/* Calculator Body */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">Error Calc</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>

          {/* Screen */}
          <div className="bg-zinc-100 dark:bg-[#0a0f1a] rounded-2xl border-t-4 border-zinc-200 dark:border-zinc-800 shadow-inner p-6 mb-8 text-right overflow-hidden relative">
            <p className="text-zinc-400 dark:text-zinc-500 text-xs sm:text-sm font-mono mb-2">Equation: find_page()</p>
            <p className="text-6xl sm:text-7xl font-bold font-mono tracking-tighter text-rose-500 dark:text-rose-400 drop-shadow-sm">
              404
            </p>
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 pointer-events-none rounded-2xl"></div>
          </div>

          {/* Error Message */}
          <div className="text-center mb-8 px-2 space-y-3">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Calculation Error</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The page you're trying to reach doesn't exist in our memory banks. Let's clear the cache and start a new calculation.
            </p>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <div className="col-span-3">
              <Link href="/" className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white font-bold text-lg shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Return to Home
              </Link>
            </div>
            <div className="col-span-1">
              <Link href="/" className="w-full h-14 rounded-xl bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 font-bold text-xl active:scale-[0.95] transition-all flex items-center justify-center">
                AC
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Decorative background blobs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
}
