/**
 * HIM - Statistics and Wellness Logic
 * Ported from includes/functions.php
 */

/**
 * Calculate mood logging streak
 * Line-by-line port of PHP getMoodStreak
 */
export function calculateMoodStreak(logDates: string[]): number {
  if (logDates.length === 0) return 0;

  // Assume logDates is sorted DESC (newest first)
  const sortedLogs = [...logDates].sort((a, b) => b.localeCompare(a));
  
  let streak = 0;
  const checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);

  const todayStr = checkDate.toISOString().split('T')[0];
  
  // If no log today, start checking from yesterday
  if (sortedLogs[0] !== todayStr) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  for (const logDate of sortedLogs) {
    const checkDateStr = checkDate.toISOString().split('T')[0];
    if (logDate === checkDateStr) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculate wellness score (0-100)
 * Line-by-line port of PHP calculateWellnessScore
 */
export function calculateWellnessScore(
  moodEntry: { mood: string; intensity: number } | null,
  symptomsEntry: Record<string, number> | null,
  streak: number
): {
  score: number;
  moodComponent: number;
  symptomComponent: number;
  activityComponent: number;
} {
  // Mood component (0-40)
  let moodScore = 20; // default neutral
  if (moodEntry) {
    const positiveMoods = ['happy', 'calm', 'neutral'];
    const positiveModifier = positiveMoods.includes(moodEntry.mood) ? 1.5 : 0.7;
    moodScore = Math.min(40, Math.round(moodEntry.intensity * 4 * positiveModifier));
  }

  // Symptom component (0-30)
  let symptomScore = 30; // default: no symptoms logged = full score
  if (symptomsEntry) {
    const symptomCount = Object.values(symptomsEntry).reduce((acc, val) => acc + (val || 0), 0);
    symptomScore = Math.max(0, 30 - (symptomCount * 4));
  }

  // Activity component (0-30)
  const activityScore = Math.min(30, streak * 5);

  const total = moodScore + symptomScore + activityScore;

  return {
    score: total,
    moodComponent: moodScore,
    symptomComponent: symptomScore,
    activityComponent: activityScore,
  };
}

/**
 * Format relative time
 * Line-by-line port of PHP timeAgo
 */
export function timeAgo(date: Date | string | number): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}
