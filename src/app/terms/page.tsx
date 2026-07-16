import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-300 shadow-xl mb-6 hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-zinc-900">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">Terms of Service</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: July 16, 2026</p>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">1. Acceptance of Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By accessing and using All Calculator Tools, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">2. Description of Service</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All Calculator Tools provides free online calculators for educational and informational purposes. Our tools include age calculators, BMI calculators, currency converters, area calculators, truck volume calculators, mileage calculators, inheritance calculators, and standard math calculators.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">3. Use of Service</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to interfere with or disrupt the service or servers</li>
              <li>Use any automated means to access or scrape the service</li>
              <li>Misuse or abuse the calculators in any way that could affect service availability</li>
              <li>Upload or transmit viruses or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">4. Intellectual Property</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, icons, images, software, and code, is the property of All Calculator Tools and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our calculators are provided on an "as is" and "as available" basis. While we strive for accuracy, we make no warranties or representations about the completeness, accuracy, reliability, or suitability of the information and calculations provided. Any reliance you place on our calculators is strictly at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">6. Limitation of Liability</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In no event shall All Calculator Tools be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of or inability to use our services. This includes, but is not limited to, any errors or omissions in any content, or any loss or damage incurred as a result of the use of our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">7. Third-Party Links & Advertisements</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our website may contain links to third-party websites and display advertisements from Google AdSense and other advertising partners. We do not endorse and are not responsible for the content, products, or services offered by third parties. Your interactions with third parties are solely between you and them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">8. Modifications to Service</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice. We may also update these Terms from time to time. Continued use of the website after any changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">9. Governing Law</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">10. Contact Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For any questions about these Terms of Service, please visit our{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link>.
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
