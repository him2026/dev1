import { supabase } from '../database/supabase';
import { DbUser, DbCycleSettings } from '../types/database';
import bcrypt from 'bcryptjs';

export const registerUser = async (
  fullName: string,
  email: string,
  passwordRaw: string,
  dob: string,
  cycleLength: number,
  lastPeriodStart: string
): Promise<{ user: DbUser | null; error: Error | null }> => {
  try {
    // 1. Check if email exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // 2. Hash password (client-side for MVP)
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(passwordRaw, salt);

    // 3. Insert user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        full_name: fullName,
        email: email,
        password_hash: passwordHash,
        date_of_birth: dob,
      })
      .select()
      .single();

    if (userError) throw userError;

    // 4. Calculate next predicted date
    const lastDate = new Date(lastPeriodStart);
    lastDate.setDate(lastDate.getDate() + cycleLength);
    const nextPredicted = lastDate.toISOString().split('T')[0];

    // 5. Insert cycle settings
    const { error: cycleError } = await supabase
      .from('cycle_settings')
      .insert({
        user_id: user.id,
        avg_cycle_length: cycleLength,
        last_period_start: lastPeriodStart,
        next_predicted_date: nextPredicted,
      });

    if (cycleError) {
      // Rollback user creation
      await supabase.from('users').delete().eq('id', user.id);
      throw cycleError;
    }

    return { user: user as DbUser, error: null };
  } catch (error: any) {
    return { user: null, error: error as Error };
  }
};

export const loginUser = async (
  email: string,
  passwordRaw: string
): Promise<{ user: DbUser | null; error: Error | null }> => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = bcrypt.compareSync(passwordRaw, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return { user: user as DbUser, error: null };
  } catch (error: any) {
    return { user: null, error: error as Error };
  }
};

export const resetPassword = async (email: string) => {
  // Placeholder for password reset flow. 
  // In custom auth without Supabase Auth, you need an edge function to send an email with a token.
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
