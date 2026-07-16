import Image from "next/image";
import Link from "next/link";

const linkClass = "text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white dark:bg-[#0f1525] border-t border-zinc-200/60 dark:border-zinc-800/60 mt-auto z-10 print:hidden">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <Image
                src="/fav.png"
                alt="All Calculator"
                width={36}
                height={36}
                className="rounded-xl shadow-lg group-hover:scale-105 transition-transform"
              />
              <div className="leading-tight">
                <span className="text-base font-bold tracking-tight text-zinc-800 dark:text-white">All Calculator Tools</span>
                <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">All-in-one Calculators</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-4 max-w-xs">
              Free online calculators for everyday use. Fast, accurate, and no sign-up required. Works on all devices.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className={linkClass}>Home</Link></li>
              <li><Link href="/blog" className={linkClass}>Blog</Link></li>
              <li><Link href="/about" className={linkClass}>About Us</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={linkClass}>Terms of Service</Link></li>
              <li><Link href="/disclaimer" className={linkClass}>Disclaimer</Link></li>
              <li><Link href="/cookies" className={linkClass}>Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4 uppercase tracking-wider">Calculators</h4>
            <ul className="space-y-2.5">
              <li><Link href="/age-calculator" className={linkClass}>Age Calculator</Link></li>
              <li><Link href="/bmi-calculator" className={linkClass}>BMI Calculator</Link></li>
              <li><Link href="/standard-calculator" className={linkClass}>Standard Calculator</Link></li>
              <li><Link href="/currency-calculator" className={linkClass}>Currency Converter</Link></li>
              <li><Link href="/truck-calculator" className={linkClass}>Truck Capacity</Link></li>
              <li><Link href="/area-calculator" className={linkClass}>Area Calculator</Link></li>
              <li><Link href="/mileage-calculator" className={linkClass}>Mileage Calculator</Link></li>
              <li><Link href="/inheritance-calculator" className={linkClass}>Inheritance Laws</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-4 uppercase tracking-wider">Developer</h4>
            <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <p className="flex items-center gap-2">
                <span className="text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest">&lt;/&gt;</span>
                Built by <span className="text-zinc-800 dark:text-zinc-200 font-semibold">Rijon Ahmed</span>
              </p>
              <p>All tools free to use. No registration, no limits.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              &copy; {currentYear} All Calculator Tools. All rights reserved.
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              All Calculator Tools — All Calculators in One Place
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
