import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-300 shadow-xl mb-6 hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-zinc-900">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">Disclaimer</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: July 16, 2026</p>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">1. General Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All information and calculators provided on this website are for general informational and educational purposes only. The tools are provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or calculations on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">2. Not Professional Advice</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              The calculators and information on this site do not constitute professional advice of any kind:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li><strong>Health & BMI:</strong> Our BMI calculator is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</li>
              <li><strong>Financial & Currency:</strong> Currency exchange rates are approximate and should not be used for trading or financial decisions without verification.</li>
              <li><strong>Legal & Inheritance:</strong> Inheritance calculators provide estimates based on general laws and should not replace advice from a qualified legal professional.</li>
              <li><strong>Construction & Area:</strong> Area and volume calculations should be verified by a professional before use in construction or material purchasing decisions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">3. Accuracy of Calculations</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              While we strive to ensure that all calculators are accurate, errors may occur. Calculation results should always be independently verified before being relied upon for any purpose. We do not guarantee that the calculations, formulas, or algorithms used are free from errors or omissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">4. External Links Disclaimer</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">5. Advertising Disclaimer</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This website displays advertisements served by Google AdSense and potentially other third-party advertising networks. We are not responsible for the content of advertisements or the products/services advertised. Clicking on advertisements is at your own discretion and we do not endorse any advertised products or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">6. Limitation of Liability</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Under no circumstances shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of this site or reliance on any information or calculations provided on this site. Your use of the site and your reliance on any information or calculations is solely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">7. No Guarantee of Availability</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We do not guarantee that our website will be available at all times. We may experience downtime for maintenance, updates, or technical issues beyond our control. We reserve the right to modify or discontinue any calculator or feature without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">8. Consent</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By using our website, you hereby consent to this disclaimer and agree to its terms. If you do not agree with this disclaimer, please discontinue use of our website immediately.
            </p>
          </section>
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
