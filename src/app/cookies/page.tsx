import Link from "next/link";

export default function CookiePolicy() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-300 shadow-xl mb-6 hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-zinc-900">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
            </svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">Cookie Policy</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: July 16, 2026</p>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">1. What Are Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, improve user experience, and provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">2. How We Use Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, such as remembering your dark/light theme preference.</li>
              <li><strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors use our site, which pages are popular, and how we can improve.</li>
              <li><strong>Advertising Cookies:</strong> Google AdSense and other advertising partners may use cookies to serve relevant advertisements based on your interests.</li>
              <li><strong>Preference Cookies:</strong> These remember choices you make, such as your preferred theme (dark/light mode).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">3. Third-Party Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              We use services from the following third parties that may set cookies on your device:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Google Analytics</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Tracks website usage and provides anonymous statistics. You can learn more at{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google's Privacy Policy</a>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Google AdSense</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Serves personalized and non-personalized advertisements. Google uses the DoubleClick cookie to serve ads based on interests. Learn more at{" "}
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google's Ad Settings</a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">4. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="border-b border-zinc-200 dark:border-zinc-700">
                  <tr>
                    <th className="py-3 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Cookie Type</th>
                    <th className="py-3 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">Purpose</th>
                    <th className="py-3 font-semibold text-zinc-700 dark:text-zinc-300">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 dark:text-zinc-400">
                  <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="py-3 pr-4 font-medium text-zinc-700 dark:text-zinc-300">theme</td>
                    <td className="py-3 pr-4">Stores your dark/light mode preference</td>
                    <td className="py-3">Persistent</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="py-3 pr-4 font-medium text-zinc-700 dark:text-zinc-300">_ga, _gid</td>
                    <td className="py-3 pr-4">Google Analytics tracking cookies</td>
                    <td className="py-3">2 years / 24 hours</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="py-3 pr-4 font-medium text-zinc-700 dark:text-zinc-300">_gat</td>
                    <td className="py-3 pr-4">Google Analytics throttle request rate</td>
                    <td className="py-3">1 minute</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-zinc-700 dark:text-zinc-300">DoubleClick</td>
                    <td className="py-3 pr-4">Google AdSense ad serving cookie</td>
                    <td className="py-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">5. Managing Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              You can control and manage cookies in various ways. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 ml-2">
              <li>View and delete existing cookies</li>
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Clear cookies when you close the browser</li>
              <li>Browse in private/incognito mode</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">
              Please note that disabling cookies may affect the functionality of this website and many other websites you visit. To manage Google's advertising cookies, visit{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Ads Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">6. Changes to This Policy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">7. More Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For more information about how we handle your data, please read our{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>{" "}
              or visit our{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link>{" "}
              if you have any questions.
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
