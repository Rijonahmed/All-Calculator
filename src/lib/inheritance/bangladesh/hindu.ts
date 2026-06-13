import { EstateInput, FamilyInput, CalculationResult, HeirShare } from "../types";
import { calculateNetEstate, createHeirResult } from "../engine";

export function calculateBangladeshHindu(estate: EstateInput, family: FamilyInput): CalculationResult {
  const { totalAssets, totalLiabilities, netEstate } = calculateNetEstate(estate);
  const totalLandSize = estate.landSize;
  const heirs: HeirShare[] = [];

  // Bangladesh Hindu law (Dayabhaga generally) favors sons, then son's sons, then widows, then daughters.
  // Simplified implementation for the scope:
  
  if (family.sons > 0) {
    const partValue = 100 / family.sons;
    for (let i = 0; i < family.sons; i++) {
      heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", partValue, netEstate, totalLandSize));
    }
  } else if (family.wives > 0) {
    const partValue = 100 / family.wives;
    for (let i = 0; i < family.wives; i++) {
      heirs.push(createHeirResult(`widow-${i+1}`, `Widow ${i+1}`, "Spouse", partValue, netEstate, totalLandSize));
    }
  } else if (family.daughters > 0) {
    const partValue = 100 / family.daughters;
    for (let i = 0; i < family.daughters; i++) {
      heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", partValue, netEstate, totalLandSize));
    }
  } else if (family.fatherAlive) {
    heirs.push(createHeirResult("father", "Father", "Parent", 100, netEstate, totalLandSize));
  } else if (family.motherAlive) {
    heirs.push(createHeirResult("mother", "Mother", "Parent", 100, netEstate, totalLandSize));
  }

  return {
    totalAssets,
    totalLiabilities,
    netEstate,
    totalLandSize,
    heirs,
    message: heirs.length === 0 ? "No immediate heirs found. Estate may go to distant relatives or escheat." : undefined
  };
}
