import { EstateInput, FamilyInput, CalculationResult, HeirShare } from "../types";
import { calculateNetEstate, createHeirResult } from "../engine";

export function calculateBangladeshMuslim(estate: EstateInput, family: FamilyInput): CalculationResult {
  const { totalAssets, totalLiabilities, netEstate } = calculateNetEstate(estate);
  const totalLandSize = estate.landSize;
  
  let remainingShare = 100;
  const heirs: HeirShare[] = [];
  
  const hasChildren = family.sons > 0 || family.daughters > 0;
  
  // 1. Spouse Share
  if (family.husbands > 0) {
    const share = hasChildren ? 25 : 50; // 1/4 or 1/2
    remainingShare -= share;
    heirs.push(createHeirResult("hus-1", "Husband", "Spouse", share, netEstate, totalLandSize));
  } else if (family.wives > 0) {
    const totalWifeShare = hasChildren ? 12.5 : 25; // 1/8 or 1/4 shared among wives
    remainingShare -= totalWifeShare;
    const perWifeShare = totalWifeShare / family.wives;
    for (let i = 0; i < family.wives; i++) {
      heirs.push(createHeirResult(`wife-${i+1}`, `Wife ${i+1}`, "Spouse", perWifeShare, netEstate, totalLandSize));
    }
  }

  // 2. Parents Share
  if (family.fatherAlive) {
    let share = 0;
    if (hasChildren) {
      share = 16.666; // 1/6
    } else {
      // Asidue (takes remainder later, but let's approximate basic 1/6 if others exist)
      // If no children, father is residuary. We'll handle this at the end if there's remainder.
      // But for fixed share:
    }
    if (share > 0) {
      remainingShare -= share;
      heirs.push(createHeirResult("father", "Father", "Parent", share, netEstate, totalLandSize));
    }
  }

  if (family.motherAlive) {
    let share = 16.666; // 1/6 if children or siblings
    if (!hasChildren && family.brothers + family.sisters < 2) {
      share = 33.333; // 1/3
    }
    remainingShare -= share;
    heirs.push(createHeirResult("mother", "Mother", "Parent", share, netEstate, totalLandSize));
  }

  // 3. Children Share (Residuary)
  if (hasChildren) {
    if (remainingShare > 0) {
      const totalParts = (family.sons * 2) + family.daughters;
      const partValue = remainingShare / totalParts;
      
      for (let i = 0; i < family.sons; i++) {
        heirs.push(createHeirResult(`son-${i+1}`, `Son ${i+1}`, "Child", partValue * 2, netEstate, totalLandSize));
      }
      for (let i = 0; i < family.daughters; i++) {
        heirs.push(createHeirResult(`daughter-${i+1}`, `Daughter ${i+1}`, "Child", partValue, netEstate, totalLandSize));
      }
      remainingShare = 0;
    }
  }

  // 4. If father alive and no children, he takes remainder
  if (family.fatherAlive && !hasChildren && remainingShare > 0) {
    const existingFather = heirs.find(h => h.id === "father");
    if (existingFather) {
      existingFather.sharePercentage += remainingShare;
      existingFather.amount += (remainingShare / 100) * netEstate;
      existingFather.landShare += (remainingShare / 100) * totalLandSize;
    } else {
      heirs.push(createHeirResult("father", "Father", "Parent", remainingShare, netEstate, totalLandSize));
    }
    remainingShare = 0;
  }

  // Very simplified fallback for siblings/grandparents if no primary heirs
  if (remainingShare > 0 && !hasChildren && !family.fatherAlive) {
    const sibParts = (family.brothers * 2) + family.sisters;
    if (sibParts > 0) {
      const partValue = remainingShare / sibParts;
      for (let i = 0; i < family.brothers; i++) {
        heirs.push(createHeirResult(`bro-${i+1}`, `Brother ${i+1}`, "Sibling", partValue * 2, netEstate, totalLandSize));
      }
      for (let i = 0; i < family.sisters; i++) {
        heirs.push(createHeirResult(`sis-${i+1}`, `Sister ${i+1}`, "Sibling", partValue, netEstate, totalLandSize));
      }
      remainingShare = 0;
    }
  }

  return {
    totalAssets,
    totalLiabilities,
    netEstate,
    totalLandSize,
    heirs,
    message: remainingShare > 0.01 ? `Unallocated estate: ${remainingShare.toFixed(2)}%. Usually distributed among distant relatives or State.` : undefined
  };
}
