export type Country = "bangladesh" | "india" | "usa";
export type LawType = 
  | "muslim" 
  | "hindu" 
  | "christian" 
  | "intestate";

export type USState = 
  | "california" 
  | "texas" 
  | "florida" 
  | "new_york" 
  | "illinois" 
  | "pennsylvania" 
  | "ohio" 
  | "georgia" 
  | "washington" 
  | "other";

export interface EstateInput {
  // Assets
  landSize: number;
  landValue: number;
  houseValue: number;
  cashValue: number;
  goldValue: number;
  businessValue: number;
  otherValue: number;

  // Liabilities
  debts: number;
  funeralExpenses: number;
  taxes: number;
}

export interface FamilyInput {
  // Spouse
  husbands: number; // For Muslim law, though legally usually 1 or 0 in calculation context, could be multiple wives
  wives: number;

  // Children
  sons: number;
  daughters: number;

  // Parents
  fatherAlive: boolean;
  motherAlive: boolean;

  // Grandparents
  grandfatherAlive: boolean;
  grandmotherAlive: boolean;

  // Siblings
  brothers: number;
  sisters: number;

  // Other Heirs
  uncles: number;
  aunts: number;
}

export interface HeirShare {
  id: string; // unique id like "son-1"
  name: string; // "Son 1"
  relationship: string; // "Son"
  sharePercentage: number; // e.g. 33.33
  amount: number; // monetary value
  landShare: number; // land size portion
}

export interface CalculationResult {
  totalAssets: number;
  totalLiabilities: number;
  netEstate: number;
  totalLandSize: number;
  heirs: HeirShare[];
  message?: string; // e.g., "Estate may escheat to the state."
}

export type RuleEngine = (estate: EstateInput, family: FamilyInput, state?: USState) => CalculationResult;
