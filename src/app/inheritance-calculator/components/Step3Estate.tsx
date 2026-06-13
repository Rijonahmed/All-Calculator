import { EstateInput } from "@/lib/inheritance/types";
import { Landmark, Home, Banknote, Coins, Briefcase, PlusCircle, CreditCard, Receipt, FileQuestion } from "lucide-react";

const InputGroup = ({ label, icon, field, val, updateField }: { label: string, icon: React.ReactNode, field: keyof EstateInput, val: number, updateField: (f: keyof EstateInput, v: string) => void }) => (
  <div className="bg-white dark:bg-zinc-900/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
    <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
      <span className="text-indigo-500">{icon}</span>
      {label}
    </label>
    <input
      type="number"
      min="0"
      value={val || ""}
      onChange={(e) => updateField(field, e.target.value)}
      placeholder="0.00"
      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);

export function Step3Estate({
  estate,
  onChange,
  onNext,
  onBack,
  t
}: {
  estate: EstateInput;
  onChange: (e: EstateInput) => void;
  onNext: () => void;
  onBack: () => void;
  t: Record<string, string>;
}) {
  const updateField = (field: keyof EstateInput, value: string) => {
    const num = parseFloat(value);
    onChange({ ...estate, [field]: isNaN(num) ? 0 : num });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t.estateTitle}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">{t.estateDesc}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">{t.assets}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputGroup label={t.landSize} icon={<Landmark className="w-4 h-4" />} field="landSize" val={estate.landSize} updateField={updateField} />
            <InputGroup label={t.landValue} icon={<Landmark className="w-4 h-4" />} field="landValue" val={estate.landValue} updateField={updateField} />
            <InputGroup label={t.houseValue} icon={<Home className="w-4 h-4" />} field="houseValue" val={estate.houseValue} updateField={updateField} />
            <InputGroup label={t.cashValue} icon={<Banknote className="w-4 h-4" />} field="cashValue" val={estate.cashValue} updateField={updateField} />
            <InputGroup label={t.goldValue} icon={<Coins className="w-4 h-4" />} field="goldValue" val={estate.goldValue} updateField={updateField} />
            <InputGroup label={t.businessValue} icon={<Briefcase className="w-4 h-4" />} field="businessValue" val={estate.businessValue} updateField={updateField} />
            <InputGroup label={t.otherValue} icon={<PlusCircle className="w-4 h-4" />} field="otherValue" val={estate.otherValue} updateField={updateField} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">{t.liabilities}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputGroup label={t.debts} icon={<CreditCard className="w-4 h-4 text-red-500" />} field="debts" val={estate.debts} updateField={updateField} />
            <InputGroup label={t.funeral} icon={<FileQuestion className="w-4 h-4 text-red-500" />} field="funeralExpenses" val={estate.funeralExpenses} updateField={updateField} />
            <InputGroup label={t.taxes} icon={<Receipt className="w-4 h-4 text-red-500" />} field="taxes" val={estate.taxes} updateField={updateField} />
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center text-indigo-900 dark:text-indigo-200">
        <div>
          <p className="text-sm font-medium opacity-80">{t.netEstateEst}</p>
          <p className="text-2xl font-bold">
            {((estate.landValue + estate.houseValue + estate.cashValue + estate.goldValue + estate.businessValue + estate.otherValue) - 
            (estate.debts + estate.funeralExpenses + estate.taxes)).toLocaleString()}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-sm opacity-70">
          {t.assetsMinusLiabilities}
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">{t.back}</button>
        <button onClick={onNext} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium shadow-md shadow-indigo-500/20">
          {t.continueFamily}
        </button>
      </div>
    </div>
  );
}
