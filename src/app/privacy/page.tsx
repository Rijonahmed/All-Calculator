import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-300 shadow-xl mb-6 hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-zinc-900">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: July 16, 2026</p>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">1. Introduction</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Welcome to All Calculator Tools. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">2. Information We Collect</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              We collect information to provide better services to all our users. The types of information we collect include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li><strong>Usage Data:</strong> We automatically collect information about how you interact with our site, including pages visited, time spent, and calculator usage patterns.</li>
              <li><strong>Device Information:</strong> We may collect information about your browser type, operating system, device type, and screen resolution.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience. See our <Link href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</Link> for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">3. How We Use Your Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li>To operate and maintain our website</li>
              <li>To improve and personalize your experience</li>
              <li>To understand and analyze usage trends</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To serve relevant advertisements through Google AdSense</li>
              <li>To communicate with you when you contact us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">4. Google Analytics & Google AdSense</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              We use third-party services that may collect information used to identify you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li><strong>Google Analytics:</strong> Tracks website usage and provides insights. Google Analytics collects anonymized data including pages visited and session duration.</li>
              <li><strong>Google AdSense:</strong> Serves advertisements on our website. AdSense uses cookies to serve ads based on your prior visits to our website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
              <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">5. Data Protection</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">6. Third-Party Links</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">7. Children's Privacy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal data, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">8. Your Rights</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li>The right to access your data</li>
              <li>The right to rectification of inaccurate data</li>
              <li>The right to erasure of your data</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">9. Changes to This Policy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">10. Contact Us</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please visit our{" "}
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
