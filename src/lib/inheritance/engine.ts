import { Country, LawType, EstateInput, FamilyInput, CalculationResult, USState } from "./types";
import { calculateBangladeshMuslim } from "./bangladesh/muslim";
import { calculateBangladeshHindu } from "./bangladesh/hindu";
import { calculateIndiaHindu } from "./india/hindu";
import { calculateIndiaMuslim } from "./india/muslim";
import { calculateIndiaChristian } from "./india/christian";
import { calculateUSAIntestate } from "./usa/intestate";

export function calculateInheritance(
  country: Country,
  law: LawType,
  estate: EstateInput,
  family: FamilyInput,
  state?: USState
): CalculationResult {
  if (country === "bangladesh") {
    if (law === "muslim") return calculateBangladeshMuslim(estate, family);
    if (law === "hindu") return calculateBangladeshHindu(estate, family);
  }

  if (country === "india") {
    if (law === "hindu") return calculateIndiaHindu(estate, family);
    if (law === "muslim") return calculateIndiaMuslim(estate, family);
    if (law === "christian") return calculateIndiaChristian(estate, family);
  }

  if (country === "usa") {
    if (law === "intestate") return calculateUSAIntestate(estate, family, state || "other");
  }

  // Fallback if not matched
  return {
    totalAssets: 0,
    totalLiabilities: 0,
    netEstate: 0,
    totalLandSize: 0,
    heirs: [],
    message: "Law not supported or implemented yet."
  };
}

export function calculateNetEstate(estate: EstateInput) {
  const totalAssets = estate.landValue + estate.houseValue + estate.cashValue + estate.goldValue + estate.businessValue + estate.otherValue;
  const totalLiabilities = estate.debts + estate.funeralExpenses + estate.taxes;
  const netEstate = Math.max(0, totalAssets - totalLiabilities); // Can't inherit negative money
  return { totalAssets, totalLiabilities, netEstate };
}

export function createHeirResult(id: string, name: string, relationship: string, sharePercentage: number, netEstate: number, totalLandSize: number) {
  return {
    id,
    name,
    relationship,
    sharePercentage,
    amount: (sharePercentage / 100) * netEstate,
    landShare: (sharePercentage / 100) * totalLandSize,
  };
}
