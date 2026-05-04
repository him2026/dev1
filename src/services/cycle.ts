import { getCurrentPhase } from '../utils/cycle';

export interface CycleSettings {
  lastPeriodStart: string | null;
  avgCycleLength: number;
  avgPeriodLength: number;
  nextPredictedDate: string | null;
  cycleRegularity: 'regular' | 'irregular';
  pcosFlag: boolean;
}

/**
 * Update cycle predictions based on a new period log
 * Line-by-line port of logic in log_period.php
 */
export function calculateNextPredictions(
  newStartDate: string,
  existingLogs: { start_date: string }[],
  currentSettings: CycleSettings
): Partial<CycleSettings> {
  const allLogs = [{ start_date: newStartDate }, ...existingLogs].sort((a, b) => b.start_date.localeCompare(a.start_date));
  
  let avgCycle = currentSettings.avgCycleLength || 28;
  
  if (allLogs.length >= 2) {
    let totalDays = 0;
    let count = 0;
    for (let i = 0; i < Math.min(5, allLogs.length - 1); i++) {
      const d1 = new Date(allLogs[i].start_date);
      const d2 = new Date(allLogs[i+1].start_date);
      const diff = Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      totalDays += diff;
      count++;
    }
    avgCycle = Math.max(20, Math.min(45, Math.round(totalDays / count)));
  }

  const nextPredictedDate = new Date(newStartDate);
  nextPredictedDate.setDate(nextPredictedDate.getDate() + avgCycle);

  const deviation = Math.abs(avgCycle - currentSettings.avgCycleLength);
  const regularity = deviation > 7 ? 'irregular' : 'regular';
  const pcosFlag = regularity === 'irregular';

  return {
    lastPeriodStart: newStartDate,
    avgCycleLength: avgCycle,
    nextPredictedDate: nextPredictedDate.toISOString().split('T')[0],
    cycleRegularity: regularity,
    pcosFlag: pcosFlag,
  };
}
