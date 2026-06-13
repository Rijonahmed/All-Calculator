import { CalculationResult } from "@/lib/inheritance/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Printer, Download, Copy } from "lucide-react";

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export function Step5Results({ result, onReset, t }: { result: CalculationResult | null, onReset: () => void, t: Record<string, string> }) {
  if (!result) return null;

  const chartData = result.heirs.map(h => ({
    name: h.name,
    value: parseFloat(h.sharePercentage.toFixed(2))
  }));

  const copyResults = () => {
    const text = `Inheritance Results:\nNet Estate: ${result.netEstate}\n` + 
      result.heirs.map(h => `${h.name} (${h.relationship}): ${h.sharePercentage.toFixed(2)}% - Amount: ${h.amount.toFixed(2)}`).join("\n");
    navigator.clipboard.writeText(text);
    alert(t.copied);
  };

  const exportCSV = () => {
    const header = "Name,Relationship,Share %,Amount,Land Share\n";
    const rows = result.heirs.map(h => `${h.name},${h.relationship},${h.sharePercentage.toFixed(2)}%,${h.amount.toFixed(2)},${h.landShare.toFixed(2)}`).join("\n");
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inheritance_results_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto printable-area">
      <div className="bg-yellow-50 dark:bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
          <strong>{t.disclaimer.split(":")[0]}:</strong> {t.disclaimer.split(":")[1] || t.disclaimer}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold mb-1">{t.totalAssets}</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{result.totalAssets.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
          <p className="text-sm text-red-500 dark:text-red-400 font-semibold mb-1">{t.totalLiabilities}</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{result.totalLiabilities.toLocaleString()}</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-500/10 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 text-center shadow-sm">
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-1">{t.netEstate}</p>
          <p className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">{result.netEstate.toLocaleString()}</p>
        </div>
      </div>

      {result.message && (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl text-center text-zinc-700 dark:text-zinc-300">
          {result.message}
        </div>
      )}

      {result.heirs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <h3 className="font-bold text-zinc-800 dark:text-zinc-200">{t.heirDistribution}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
                <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-500">
                  <tr>
                    <th className="px-6 py-3">{t.name}</th>
                    <th className="px-6 py-3">{t.rel}</th>
                    <th className="px-6 py-3">{t.sharePercent}</th>
                    <th className="px-6 py-3">{t.amount}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {result.heirs.map((h, i) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{h.name}</td>
                      <td className="px-6 py-4">{h.relationship}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">{h.sharePercentage.toFixed(2)}%</td>
                      <td className="px-6 py-4 font-semibold">{h.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-4 w-full text-left">{t.visualDistribution}</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Tooltip formatter={(value: any) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 print:hidden">
        <button onClick={onReset} className="px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">{t.startOver}</button>
        <div className="flex gap-2">
          <button onClick={copyResults} className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors" title={t.copy}><Copy className="w-5 h-5"/></button>
          <button onClick={exportCSV} className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors" title={t.exportCsv}><Download className="w-5 h-5"/></button>
          <button onClick={() => window.print()} className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors font-medium flex items-center gap-2"><Printer className="w-4 h-4"/> {t.printPdf}</button>
        </div>
      </div>
    </div>
  );
}
