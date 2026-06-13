import { Country } from "@/lib/inheritance/types";

export function Step1Country({ value, onChange, onNext, t }: { value: Country | null, onChange: (v: Country) => void, onNext: () => void, t: Record<string, string> }) {
  const countries = [
    { id: "bangladesh", name: t.bangladesh, flag: "🇧🇩" },
    { id: "india", name: t.india, flag: "🇮🇳" },
    { id: "usa", name: t.usa, flag: "🇺🇸" }
  ] as const;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t.selectCountryTitle}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">{t.selectCountryDesc}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {countries.map(c => (
          <button
            key={c.id}
            onClick={() => { onChange(c.id as Country); setTimeout(onNext, 200); }}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${
              value === c.id 
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:border-indigo-500" 
                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-indigo-300 dark:hover:border-indigo-700"
            }`}
          >
            <span className="text-5xl">{c.flag}</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
