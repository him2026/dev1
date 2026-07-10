import { supabase } from '../database/supabase';
import { DbUser, DbCycleSettings } from '../types/database';

export const getProfile = async (userId: string) => {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError) throw userError;

  const { data: cycleSettings, error: cycleError } = await supabase
    .from('cycle_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { user: user as DbUser, cycleSettings: cycleSettings as DbCycleSettings };
};

export const updateProfile = async (userId: string, updates: Partial<DbUser>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as DbUser;
};

export const deleteAccount = async (userId: string) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) throw error;
};
