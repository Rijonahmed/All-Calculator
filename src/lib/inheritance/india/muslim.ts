import { calculateBangladeshMuslim } from "../bangladesh/muslim";
import { EstateInput, FamilyInput, CalculationResult } from "../types";

export function calculateIndiaMuslim(estate: EstateInput, family: FamilyInput): CalculationResult {
  // Muslim Personal Law (Shariat) Application Act, 1937
  // The core Sunni rules are practically identical to Bangladesh's Muslim inheritance law.
  return calculateBangladeshMuslim(estate, family);
}
