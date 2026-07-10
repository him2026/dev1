import { supabase } from '../database/supabase';
import { DbPeriodLog, DbCycleSettings } from '../types/database';
import { calculateNextPredictions } from './cycle';

export const savePeriodLog = async (
  userId: string,
  startDate: string,
  endDate: string | null,
  flowIntensity: string,
  symptoms: Record<string, boolean>,
  severity: string,
  notes: string | null,
  currentSettings: any
) => {
  // 1. Insert period log
  const { data: periodData, error: periodError } = await supabase
    .from('period_logs')
    .insert({
      user_id: userId,
      start_date: startDate,
      end_date: endDate,
      flow_intensity: flowIntensity,
      notes,
    })
    .select()
    .single();

  if (periodError) throw periodError;

  // 2. Insert symptom log
  const activeSymptoms = Object.entries(symptoms)
    .filter(([_, active]) => active)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  if (Object.keys(activeSymptoms).length > 0 || severity !== 'mild') {
    const { error: symptomError } = await supabase
      .from('symptom_logs')
      .insert({
        user_id: userId,
        log_date: startDate,
        symptoms_json: activeSymptoms,
        severity,
      });
    if (symptomError) throw symptomError;
  }

  // 3. Recalculate cycle settings
  const { data: allLogs } = await supabase
    .from('period_logs')
    .select('start_date')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });

  if (allLogs) {
    const newPredictions = calculateNextPredictions(startDate, allLogs, currentSettings);
    
    // Map camelCase to snake_case for Supabase
    const updatePayload: Record<string, any> = {};
    if (newPredictions.lastPeriodStart !== undefined) updatePayload.last_period_start = newPredictions.lastPeriodStart;
    if (newPredictions.avgCycleLength !== undefined) updatePayload.avg_cycle_length = newPredictions.avgCycleLength;
    if (newPredictions.nextPredictedDate !== undefined) updatePayload.next_predicted_date = newPredictions.nextPredictedDate;
    if (newPredictions.pcosFlag !== undefined) updatePayload.pcos_flag = newPredictions.pcosFlag;
    updatePayload.updated_at = new Date().toISOString();

    // Update cycle settings
    const { error: cycleError } = await supabase
      .from('cycle_settings')
      .update(updatePayload)
      .eq('user_id', userId);

    if (cycleError) throw cycleError;
  }

  return periodData as DbPeriodLog;
};

export const getPeriodLogs = async (userId: string) => {
  const { data, error } = await supabase
    .from('period_logs')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });

  if (error) throw error;
  return data as DbPeriodLog[];
};
