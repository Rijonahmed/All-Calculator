import { EstateInput, FamilyInput, CalculationResult, HeirShare } from "../types";
import { calculateNetEstate, createHeirResult } from "../engine";

export function calculateIndiaHindu(estate: EstateInput, family: FamilyInput): CalculationResult {
  const { totalAssets, totalLiabilities, netEstate } = calculateNetEstate(estate);
  const totalLandSize = estate.landSize;
  const heirs: HeirShare[] = [];

  // Hindu Succession Act (India) - Class I Heirs
  // Widow, Son, Daughter, Mother take equally.
  
  const classIHeirsCount = family.wives + family.sons + family.daughters + (family.motherAlive ? 1 : 0);

  if (classIHeirsCount > 0) {
    const partValue = 100 / classIHeirsCount;
    
    for (let i = 0; i < family.wives; i++) heirs.push(createHeirResult(`widow-${i+1}`, `Widow ${i+1}`, "Spouse", partValue, netEstate, totalLandSize));
    for (let i = 0; i < family.sons; i++) heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", partValue, netEstate, totalLandSize));
    for (let i = 0; i < family.daughters; i++) heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", partValue, netEstate, totalLandSize));
    if (family.motherAlive) heirs.push(createHeirResult("mother", "Mother", "Parent", partValue, netEstate, totalLandSize));
  } else if (family.fatherAlive) {
    // Class II entry (Father is Class II, Entry I)
    heirs.push(createHeirResult("father", "Father", "Parent", 100, netEstate, totalLandSize));
  } else {
    // Other Class II ... Simplified
    const siblings = family.brothers + family.sisters;
    if (siblings > 0) {
      const partValue = 100 / siblings;
      for (let i = 0; i < family.brothers; i++) heirs.push(createHeirResult(`bro-${i+1}`, `Brother ${i+1}`, "Sibling", partValue, netEstate, totalLandSize));
      for (let i = 0; i < family.sisters; i++) heirs.push(createHeirResult(`sis-${i+1}`, `Sister ${i+1}`, "Sibling", partValue, netEstate, totalLandSize));
    }
  }

  return {
    totalAssets,
    totalLiabilities,
    netEstate,
    totalLandSize,
    heirs,
    message: heirs.length === 0 ? "No Class I or primary Class II heirs found." : undefined
  };
}
