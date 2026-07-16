import Link from "next/link";

export default function ContactUs() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-300 shadow-xl mb-6 hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-zinc-900">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">Contact Us</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white dark:bg-zinc-900/80 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Email Us</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Send us an email and we'll get back to you within 24-48 hours.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/80 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Response Time</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We typically respond to all inquiries within 24 hours during business days.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/80 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Worldwide</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Our tools are available globally. We welcome feedback from users everywhere.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Get in Touch</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              For questions about our calculators, advertising inquiries, bug reports, or feature suggestions, please reach out via email.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              contact@allcalculatortools.com
            </span>
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            We use your email only to respond to your inquiry. We never share or sell your contact information.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
