import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0f1525] p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-100 dark:to-zinc-300 shadow-xl mb-6 hover:scale-105 transition-transform">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-zinc-900">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">About Precision Tools</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Welcome to your ultimate hub for free, accurate, and easy-to-use online calculators. Whether you need to manage your health, finances, or construction projects, we've got you covered.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          
          <div className="bg-white dark:bg-zinc-900/80 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Our Calculators & How to Use Them</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              We offer a diverse set of calculators tailored for everyday calculations. Here is a detailed guide on each tool available on our platform:
            </p>

            <div className="space-y-8">
              
              {/* Age Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/age-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Age Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  The Age Calculator helps you find out your exact age down to the minute. It breaks down your life duration into years, months, days, weeks, hours, and minutes.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Select your Date of Birth using the calendar input.</li>
                    <li>The current date is selected by default, but you can change it to calculate age at a specific future or past date.</li>
                    <li>Click "Calculate Age" to see your detailed age breakdown and upcoming birthday countdown.</li>
                  </ul>
                </div>
              </div>

              {/* BMI Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/bmi-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    BMI Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if your weight is healthy. Our calculator also estimates body fat percentage.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Toggle between "Metric (kg/cm)" or "Imperial (lbs/ft)" based on your preference.</li>
                    <li>Enter your Age and Gender (optional, but required for body fat estimation).</li>
                    <li>Input your current Height and Weight.</li>
                    <li>Click "Calculate BMI" to view your BMI score, health category, and healthy weight range.</li>
                  </ul>
                </div>
              </div>

              {/* Currency Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/currency-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><path d="M10 9.5a2.5 2.5 0 0 1 5 0c0 1.5-5 1.5-5 3a2.5 2.5 0 0 0 5 0"/></svg>
                    Currency Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  A live currency converter providing real-time exchange rates for all global currencies. Perfect for travelers and financial planning.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Enter the amount of money you want to convert.</li>
                    <li>Select the currency you have ("From") and the currency you want ("To").</li>
                    <li>The converted amount and the live exchange rate will update automatically.</li>
                    <li>Use the swap button in the middle to quickly reverse the conversion.</li>
                  </ul>
                </div>
              </div>

              {/* Area Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/area-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    House & Room Area Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  Calculate the square footage and square meters of a single room or an entire house instantly. Ideal for real estate, flooring, and interior design.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Enter a Room Name, and input the Length and Width.</li>
                    <li>Select the measurement unit (Feet, Inches, or Meters).</li>
                    <li>Click "Add Another Room" to calculate multiple rooms simultaneously.</li>
                    <li>The sidebar will automatically summarize the Total House Area in both sq ft and m².</li>
                  </ul>
                </div>
              </div>

              {/* Truck Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/truck-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="14" height="6" rx="1"/><path d="M16 13H22v-2l-2-4h-4v6z"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/></svg>
                    Truck Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  A specialized tool for calculating the carrying capacity (CFT/Volume) of dump trucks based on their cargo box dimensions.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Measure the inner dimensions of the truck's cargo bed.</li>
                    <li>Enter the Length, Width, and Height in Feet and Inches.</li>
                    <li>The calculator instantly provides the total volume in Cubic Feet (CFT).</li>
                  </ul>
                </div>
              </div>

              {/* Mileage Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/mileage-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
                    Mileage Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  Calculate your vehicle's fuel efficiency, total fuel required, and estimate trip costs. Perfect for planning long drives and tracking vehicle performance.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Select your vehicle type (Car or Motorcycle) and unit preferences (KM/Miles, Liters/Gallons).</li>
                    <li>Choose a calculation mode: Basic, Full Tank, Fuel Cost, or Trip Estimator.</li>
                    <li>Input the required fields such as Distance, Fuel Used, or Odometer readings.</li>
                    <li>Click "Calculate" to see detailed metrics including km/L, MPG, and total cost.</li>
                    <li>Your calculations are automatically saved to the History tab for future reference.</li>
                  </ul>
                </div>
              </div>

              {/* Inheritance Calculator */}
              <div className="pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <Link href="/inheritance-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                    Inheritance Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  Calculate complex property distributions and inheritance shares based on the specific laws of Bangladesh, India, and the USA.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Select Country: Choose the jurisdiction (Bangladesh, India, USA) where the deceased resided.</li>
                    <li>Select Law: Pick the applicable inheritance law based on religion or state rules.</li>
                    <li>Enter Estate Values: Input the value of assets (land, house, cash) and deduct any liabilities (debts, taxes).</li>
                    <li>Build Family Tree: Add the surviving family members (spouse, children, parents, siblings) using the counters and toggles.</li>
                    <li>View Results: See the exact percentage and amount each heir will receive. You can copy, export to CSV, or save the results as a PDF.</li>
                  </ul>
                </div>
              </div>

              {/* Standard Calculator */}
              <div>
                <Link href="/standard-calculator" className="inline-block group">
                  <h3 className="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2 flex items-center gap-2 group-hover:underline">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="8" y1="10" x2="8" y2="10.01"/></svg>
                    Standard Calculator
                  </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  A digital version of the classic pocket calculator for your everyday basic math problems.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                  <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">How to Use:</strong>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>Use the on-screen buttons or your keyboard to input numbers.</li>
                    <li>Perform addition (+), subtraction (-), multiplication (×), and division (÷).</li>
                    <li>Press "=" or Enter to get the final result.</li>
                    <li>Use "AC" to clear all inputs or "C" to delete the last digit.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Contact / Footer text */}
          <div className="text-center mt-10">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Calculators
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
