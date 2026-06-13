import { EstateInput, FamilyInput, CalculationResult, HeirShare } from "../types";
import { calculateNetEstate, createHeirResult } from "../engine";

export function calculateIndiaChristian(estate: EstateInput, family: FamilyInput): CalculationResult {
  const { totalAssets, totalLiabilities, netEstate } = calculateNetEstate(estate);
  const totalLandSize = estate.landSize;
  const heirs: HeirShare[] = [];

  // Indian Succession Act, 1925 (Christian)
  const children = family.sons + family.daughters;
  
  if (family.wives > 0 || family.husbands > 0) {
    const isWidow = family.wives > 0;
    const spouseId = isWidow ? "widow-1" : "widower-1";
    const spouseName = isWidow ? "Widow" : "Widower";

    if (children > 0) {
      // Spouse gets 1/3, children get 2/3
      heirs.push(createHeirResult(spouseId, spouseName, "Spouse", 33.333, netEstate, totalLandSize));
      
      const childShare = 66.666 / children;
      for (let i = 0; i < family.sons; i++) heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", childShare, netEstate, totalLandSize));
      for (let i = 0; i < family.daughters; i++) heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", childShare, netEstate, totalLandSize));
    } else {
      // Spouse gets 1/2, kindred gets 1/2. If no kindred, spouse gets all.
      const kindred = family.fatherAlive || family.motherAlive || family.brothers > 0 || family.sisters > 0;
      if (kindred) {
        heirs.push(createHeirResult(spouseId, spouseName, "Spouse", 50, netEstate, totalLandSize));
        // Allocate 50% to kindred... simplified to father
        if (family.fatherAlive) heirs.push(createHeirResult("father", "Father", "Parent", 50, netEstate, totalLandSize));
        else if (family.motherAlive) heirs.push(createHeirResult("mother", "Mother", "Parent", 50, netEstate, totalLandSize));
      } else {
        heirs.push(createHeirResult(spouseId, spouseName, "Spouse", 100, netEstate, totalLandSize));
      }
    }
  } else if (children > 0) {
    // All to children equally
    const childShare = 100 / children;
    for (let i = 0; i < family.sons; i++) heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", childShare, netEstate, totalLandSize));
    for (let i = 0; i < family.daughters; i++) heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", childShare, netEstate, totalLandSize));
  } else if (family.fatherAlive) {
    heirs.push(createHeirResult("father", "Father", "Parent", 100, netEstate, totalLandSize));
  }

  return {
    totalAssets,
    totalLiabilities,
    netEstate,
    totalLandSize,
    heirs,
    message: heirs.length === 0 ? "Estate may go to distant relatives or escheat." : undefined
  };
}
