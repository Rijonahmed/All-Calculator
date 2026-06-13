import { FamilyInput } from "@/lib/inheritance/types";
import { User, Users, Plus, Minus, UserCheck, UserX } from "lucide-react";

const CountRow = ({ label, field, family, updateCount, max = 99 }: { label: string, field: keyof FamilyInput, family: FamilyInput, updateCount: (f: keyof FamilyInput, d: number) => void, max?: number }) => (
  <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
    <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
      <Users className="w-4 h-4 text-indigo-500" />
      {label}
    </span>
    <div className="flex items-center gap-3">
      <button onClick={() => updateCount(field, -1)} className="p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-6 text-center font-bold text-zinc-900 dark:text-white">{family[field] as number}</span>
      <button onClick={() => updateCount(field, 1)} disabled={(family[field] as number) >= max} className="p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 disabled:opacity-50">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const ToggleRow = ({ label, field, family, toggleBool, t }: { label: string, field: keyof FamilyInput, family: FamilyInput, toggleBool: (f: keyof FamilyInput) => void, t: Record<string, string> }) => {
  const isAlive = family[field] as boolean;
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
        <User className="w-4 h-4 text-indigo-500" />
        {label}
      </span>
      <button 
        onClick={() => toggleBool(field)} 
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1 ${
          isAlive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        }`}
      >
        {isAlive ? <><UserCheck className="w-3 h-3"/> {t.alive}</> : <><UserX className="w-3 h-3"/> {t.deceased}</>}
      </button>
    </div>
  );
};

export function Step4Family({
  family,
  onChange,
  onNext,
  onBack,
  t
}: {
  family: FamilyInput;
  onChange: (f: FamilyInput) => void;
  onNext: () => void;
  onBack: () => void;
  t: Record<string, string>;
}) {
  const updateCount = (field: keyof FamilyInput, delta: number) => {
    const val = family[field] as number;
    onChange({ ...family, [field]: Math.max(0, val + delta) });
  };

  const toggleBool = (field: keyof FamilyInput) => {
    onChange({ ...family, [field]: !family[field] });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t.familyTitle}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">{t.familyDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2">{t.spouse}</h3>
          <CountRow label={t.husbands} field="husbands" family={family} updateCount={updateCount} max={1} />
          <CountRow label={t.wives} field="wives" family={family} updateCount={updateCount} max={4} />

          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2 mt-6">{t.children}</h3>
          <CountRow label={t.sons} field="sons" family={family} updateCount={updateCount} />
          <CountRow label={t.daughters} field="daughters" family={family} updateCount={updateCount} />
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2">{t.parents}</h3>
          <ToggleRow label={t.father} field="fatherAlive" family={family} toggleBool={toggleBool} t={t} />
          <ToggleRow label={t.mother} field="motherAlive" family={family} toggleBool={toggleBool} t={t} />

          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2 mt-6">{t.siblings}</h3>
          <CountRow label={t.brothers} field="brothers" family={family} updateCount={updateCount} />
          <CountRow label={t.sisters} field="sisters" family={family} updateCount={updateCount} />
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">{t.back}</button>
        <button onClick={onNext} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium shadow-md shadow-indigo-500/20">
          {t.calculateInheritance}
        </button>
      </div>
    </div>
  );
}
