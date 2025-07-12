import { LEVELS } from "../data/levels";

export function getManagementFees(level: string) {
  const found = LEVELS.find(l => l.level === level);
  if (!found) return null;
  const { dailyWages, managementFeeRatios } = found;
  return {
    A: +(dailyWages * managementFeeRatios.A).toFixed(2),
    B: +(dailyWages * managementFeeRatios.B).toFixed(2),
    C: +(dailyWages * managementFeeRatios.C).toFixed(2),
  };
} 