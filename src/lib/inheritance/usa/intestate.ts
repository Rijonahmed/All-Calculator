import { EstateInput, FamilyInput, CalculationResult, HeirShare, USState } from "../types";
import { calculateNetEstate, createHeirResult } from "../engine";

export function calculateUSAIntestate(estate: EstateInput, family: FamilyInput, state: USState): CalculationResult {
  const { totalAssets, totalLiabilities, netEstate } = calculateNetEstate(estate);
  const totalLandSize = estate.landSize;
  const heirs: HeirShare[] = [];

  const children = family.sons + family.daughters;
  const spouse = family.wives > 0 || family.husbands > 0;
  const spouseName = family.wives > 0 ? "Wife" : "Husband";
  const spouseId = family.wives > 0 ? "wife-1" : "hus-1";

  // Intestate succession generalized logic (very simplified for proof of concept).
  // California: Community property goes to spouse. Separate goes 1/2 to spouse if 1 child, 1/3 if > 1 child.
  // Texas: Similar, but with different separate property fractions.
  // Here we use a generic intestate model:

  if (spouse && children === 0 && !family.fatherAlive && !family.motherAlive) {
    heirs.push(createHeirResult(spouseId, spouseName, "Spouse", 100, netEstate, totalLandSize));
  } else if (spouse && children > 0) {
    // simplified: 50% to spouse, 50% to kids
    heirs.push(createHeirResult(spouseId, spouseName, "Spouse", 50, netEstate, totalLandSize));
    const childShare = 50 / children;
    for (let i = 0; i < family.sons; i++) heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", childShare, netEstate, totalLandSize));
    for (let i = 0; i < family.daughters; i++) heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", childShare, netEstate, totalLandSize));
  } else if (!spouse && children > 0) {
    const childShare = 100 / children;
    for (let i = 0; i < family.sons; i++) heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", childShare, netEstate, totalLandSize));
    for (let i = 0; i < family.daughters; i++) heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", childShare, netEstate, totalLandSize));
  } else if (family.fatherAlive || family.motherAlive) {
    if (spouse) {
      heirs.push(createHeirResult(spouseId, spouseName, "Spouse", 50, netEstate, totalLandSize));
      const parentShare = family.fatherAlive && family.motherAlive ? 25 : 50;
      if (family.fatherAlive) heirs.push(createHeirResult("father", "Father", "Parent", parentShare, netEstate, totalLandSize));
      if (family.motherAlive) heirs.push(createHeirResult("mother", "Mother", "Parent", parentShare, netEstate, totalLandSize));
    } else {
      const parentShare = family.fatherAlive && family.motherAlive ? 50 : 100;
      if (family.fatherAlive) heirs.push(createHeirResult("father", "Father", "Parent", parentShare, netEstate, totalLandSize));
      if (family.motherAlive) heirs.push(createHeirResult("mother", "Mother", "Parent", parentShare, netEstate, totalLandSize));
    }
  } else {
    const siblings = family.brothers + family.sisters;
    if (siblings > 0) {
      const sibShare = 100 / siblings;
      for (let i = 0; i < family.brothers; i++) heirs.push(createHeirResult(`bro-${i+1}`, `Brother ${i+1}`, "Sibling", sibShare, netEstate, totalLandSize));
      for (let i = 0; i < family.sisters; i++) heirs.push(createHeirResult(`sis-${i+1}`, `Sister ${i+1}`, "Sibling", sibShare, netEstate, totalLandSize));
    }
  }

  return {
    totalAssets,
    totalLiabilities,
    netEstate,
    totalLandSize,
    heirs,
    message: heirs.length === 0 ? "Estate may escheat to the state." : `Calculated using simplified intestate rules for ${state.replace("_", " ")}.`
  };
}
