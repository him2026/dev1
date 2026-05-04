/**
 * HIM - Cycle Utility Functions
 * Ported from PHP includes/functions.php
 */

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface PhaseInfo {
  name: string;
  icon: string;
  color: string;
  description: string;
}

/**
 * Get user's current cycle phase
 * Line-by-line port of PHP getCurrentPhase
 */
export function getCurrentPhase(
  lastPeriodStart: string | null | undefined,
  avgCycleLength: number,
  avgPeriodLength: number
): CyclePhase {
  if (!lastPeriodStart) return 'menstrual';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(lastPeriodStart);
  start.setHours(0, 0, 0, 0);

  // Difference in days
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const dayInCycle = (diffDays % avgCycleLength) + 1;

  if (dayInCycle <= avgPeriodLength) return 'menstrual';
  if (dayInCycle <= Math.round(avgCycleLength * 0.45)) return 'follicular';
  if (dayInCycle <= Math.round(avgCycleLength * 0.55)) return 'ovulation';
  
  return 'luteal';
}

/**
 * Get phase display info
 * Line-by-line port of PHP getPhaseInfo
 */
export function getPhaseInfo(phase: CyclePhase): PhaseInfo {
  const phases: Record<CyclePhase, PhaseInfo> = {
    menstrual: {
      name: 'Menstrual Phase',
      icon: 'droplet',
      color: '#E8567F',
      description: 'Your body is shedding the uterine lining. Take it easy, rest, and be gentle with yourself.'
    },
    follicular: {
      name: 'Follicular Phase',
      icon: 'seedling',
      color: '#7CB69E',
      description: 'Energy is rising! Great time for new beginnings, workouts, and creativity.'
    },
    ovulation: {
      name: 'Ovulation Phase',
      icon: 'sun',
      color: '#F4A261',
      description: 'Peak energy and confidence! You\'re at your strongest and most social.'
    },
    luteal: {
      name: 'Luteal Phase',
      icon: 'cloud-moon',
      color: '#9B8EC0',
      description: 'Winding down. Focus on self-care, comfort foods, and gentle activities.'
    }
  };
  return phases[phase] || phases['menstrual'];
}
