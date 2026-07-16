import Link from "next/link";

const calculators = [
  {
    href: "/age-calculator",
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days down to the minute.",
    gradient: "from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500",
    shadow: "shadow-blue-500/20",
    hover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/bmi-calculator",
    title: "BMI Calculator",
    description: "Check your Body Mass Index (BMI) and discover your ideal healthy weight range.",
    gradient: "from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500",
    shadow: "shadow-emerald-500/20",
    hover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    href: "/standard-calculator",
    title: "Standard Calculator",
    description: "A basic calculator for quick and easy everyday math calculations.",
    gradient: "from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500",
    shadow: "shadow-violet-500/20",
    hover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    icon: (
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
    ),
  },
  {
    href: "/currency-calculator",
    title: "Currency Calculator",
    description: "Check live exchange rates and convert between global currencies.",
    gradient: "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500",
    shadow: "shadow-amber-500/20",
    hover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <path d="M10 9.5a2.5 2.5 0 0 1 5 0c0 1.5-5 1.5-5 3a2.5 2.5 0 0 0 5 0" />
      </svg>
    ),
  },
  {
    href: "/truck-calculator",
    title: "Truck Calculator",
    description: "Calculate exactly how much sand or soil your dump truck can carry.",
    gradient: "from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500",
    shadow: "shadow-yellow-500/20",
    hover: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="14" height="6" rx="1" />
        <path d="M16 13H22v-2l-2-4h-4v6z" />
        <circle cx="6" cy="17" r="2" />
        <circle cx="18" cy="17" r="2" />
      </svg>
    ),
  },
  {
    href: "/area-calculator",
    title: "Area Calculator",
    description: "Calculate room and house area instantly in square feet and square meters.",
    gradient: "from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500",
    shadow: "shadow-cyan-500/20",
    hover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    href: "/mileage-calculator",
    title: "Mileage Calculator",
    description: "Calculate your vehicle's fuel efficiency, total fuel required, and trip costs.",
    gradient: "from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500",
    shadow: "shadow-indigo-500/20",
    hover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="4" y1="9" x2="14" y2="9" />
        <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
        <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
      </svg>
    ),
  },
  {
    href: "/inheritance-calculator",
    title: "Inheritance Calculator",
    description: "Calculate property distribution for Bangladesh, India, and USA inheritance laws.",
    gradient: "from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500",
    shadow: "shadow-pink-500/20",
    hover: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative overflow-hidden bg-zinc-50 dark:bg-[#0f1525] px-4 pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-violet-500/5 dark:bg-violet-400/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3 dark:from-blue-400/3 dark:to-purple-400/3 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6 ring-1 ring-zinc-200 dark:ring-zinc-700/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Free &amp; Unlimited Tools
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-5 leading-[1.1]">
            All Your Calculations{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              in One Place
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Free online calculators for age, BMI, currency, area, mileage, inheritance, and more. Fast, accurate, and no sign-up required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#calculators"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm shadow-lg shadow-zinc-900/20 dark:shadow-white/10 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
              Explore Tools
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-sm hover:border-zinc-300 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section id="calculators" className="flex-1 bg-zinc-50 dark:bg-[#0f1525] px-4 pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
              Choose a Calculator
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              Select from our collection of free, accurate calculator tools for every need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group flex flex-col items-center p-7 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center shadow-lg ${calc.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  {calc.icon}
                </div>
                <h3
                  className={`text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3 ${calc.hover} transition-colors text-center`}
                >
                  {calc.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed text-center">
                  {calc.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              All tools are free to use &bull; No registration required &bull; Works on all devices
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
