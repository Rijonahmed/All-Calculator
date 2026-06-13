import { Country, LawType, USState } from "@/lib/inheritance/types";

export function Step2Law({
  country,
  law,
  state,
  onLawChange,
  onStateChange,
  onNext,
  onBack,
  t
}: {
  country: Country;
  law: LawType | null;
  state: USState | null;
  onLawChange: (l: LawType) => void;
  onStateChange: (s: USState) => void;
  onNext: () => void;
  onBack: () => void;
  t: Record<string, string>;
}) {
  const laws: Record<Country, { id: LawType, name: string, desc: string }[]> = {
    bangladesh: [
      { id: "muslim", name: t.muslimLaw, desc: t.muslimLawDesc },
      { id: "hindu", name: t.hinduLaw, desc: t.hinduLawDesc }
    ],
    india: [
      { id: "hindu", name: t.hinduSuccession, desc: t.hinduSuccessionDesc },
      { id: "muslim", name: t.muslimLaw, desc: t.muslimLawDesc },
      { id: "christian", name: t.christianLaw, desc: t.christianLawDesc }
    ],
    usa: [
      { id: "intestate", name: t.intestate, desc: t.intestateDesc }
    ]
  };

  const usStates = [
    { id: "california", name: "California" },
    { id: "texas", name: "Texas" },
    { id: "florida", name: "Florida" },
    { id: "new_york", name: "New York" },
    { id: "other", name: t.otherState }
  ] as const;

  const currentLaws = laws[country];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t.selectLawTitle}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">{t.selectLawDesc}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentLaws.map(l => (
          <button
            key={l.id}
            onClick={() => onLawChange(l.id)}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              law === l.id 
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:border-indigo-500" 
                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-indigo-300 dark:hover:border-indigo-700"
            }`}
          >
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{l.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{l.desc}</p>
          </button>
        ))}
      </div>

      {country === "usa" && law === "intestate" && (
        <div className="mt-8">
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">{t.selectState}</label>
          <select 
            value={state || ""} 
            onChange={(e) => onStateChange(e.target.value as USState)}
            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="" disabled>{t.selectState}...</option>
            {usStates.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      )}

      <div className="flex justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">{t.back}</button>
        <button 
          onClick={onNext} 
          disabled={!law || (country === "usa" && law === "intestate" && !state)}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
        >
          {t.continueAssets}
        </button>
      </div>
    </div>
  );
}
