import { supabase } from '../database/supabase';
import { DbMoodLog } from '../types/database';

export const saveMoodLog = async (
  userId: string,
  logDate: string,
  moods: string[],
  intensity: number,
  notes: string | null
) => {
  const { data, error } = await supabase
    .from('mood_logs')
    .insert({
      user_id: userId,
      log_date: logDate,
      moods,
      intensity,
      notes,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbMoodLog;
};

export const getRecentMoodLogs = async (userId: string, limit = 14) => {
  const { data, error } = await supabase
    .from('mood_logs')
    .select('*')
    .eq('user_id', userId)
    .order('log_date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as DbMoodLog[];
};
