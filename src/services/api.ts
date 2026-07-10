import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { DbUser, DbCycleSettings, DbMoodLog, DbPeriodLog, DbChatSession, DbChatMessage } from '../types/database';
import { calculateNextPredictions } from './cycle';
import { buildSystemPrompt, detectSentiment } from './ai';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// --- AUTH ---
export const registerUser = async (
  fullName: string,
  email: string,
  passwordRaw: string,
  dob: string,
  cycleLength: number,
  lastPeriodStart: string
): Promise<{ user: DbUser | null; error: Error | null }> => {
  try {
    const { data: existingUser } = await supabase.from('users').select('id').eq('email', email).single();
    if (existingUser) throw new Error('Email already registered');

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(passwordRaw, salt);

    const { data: user, error: userError } = await supabase.from('users').insert({
      full_name: fullName,
      email: email,
      password_hash: passwordHash,
      date_of_birth: dob,
    }).select().single();

    if (userError) throw userError;

    const lastDate = new Date(lastPeriodStart);
    lastDate.setDate(lastDate.getDate() + cycleLength);
    const nextPredicted = lastDate.toISOString().split('T')[0];

    const { error: cycleError } = await supabase.from('cycle_settings').insert({
      user_id: user.id,
      avg_cycle_length: cycleLength,
      last_period_start: lastPeriodStart,
      next_predicted_date: nextPredicted,
    });

    if (cycleError) {
      await supabase.from('users').delete().eq('id', user.id);
      throw cycleError;
    }

    return { user: user as DbUser, error: null };
  } catch (error: any) {
    return { user: null, error: error as Error };
  }
};

export const loginUser = async (email: string, passwordRaw: string): Promise<{ user: DbUser | null; error: Error | null }> => {
  try {
    const { data: user, error } = await supabase.from('users').select('*').eq('email', email).single();
    if (error || !user) throw new Error('Invalid email or password');

    const isMatch = bcrypt.compareSync(passwordRaw, user.password_hash);
    if (!isMatch) throw new Error('Invalid email or password');

    return { user: user as DbUser, error: null };
  } catch (error: any) {
    return { user: null, error: error as Error };
  }
};

export const resetPassword = async (email: string) => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// --- PROFILE ---
export const getProfile = async (userId: string) => {
  const { data: user, error: userError } = await supabase.from('users').select('*').eq('id', userId).single();
  if (userError) throw userError;

  const { data: cycleSettings, error: cycleError } = await supabase.from('cycle_settings').select('*').eq('user_id', userId).single();
  return { user: user as DbUser, cycleSettings: cycleSettings as DbCycleSettings };
};

export const updateProfile = async (userId: string, updates: Partial<DbUser>) => {
  const { data, error } = await supabase.from('users').update(updates).eq('id', userId).select().single();
  if (error) throw error;
  return data as DbUser;
};

export const deleteAccount = async (userId: string) => {
  const { error } = await supabase.from('users').delete().eq('id', userId);
  if (error) throw error;
};

export const updateUserPoints = async (userId: string, pointsToAdd: number) => {
  const { data: user, error: fetchError } = await supabase.from('users').select('points').eq('id', userId).single();
  if (fetchError) throw fetchError;
  
  const newPoints = (user.points || 0) + pointsToAdd;
  const { data, error } = await supabase.from('users').update({ points: newPoints }).eq('id', userId).select().single();
  if (error) throw error;
  return data as DbUser;
};

export const awardBadge = async (userId: string, badgeId: string) => {
  const { data: user, error: fetchError } = await supabase.from('users').select('badges').eq('id', userId).single();
  if (fetchError) throw fetchError;
  
  const badges = user.badges || [];
  if (!badges.includes(badgeId)) {
    badges.push(badgeId);
    const { data, error } = await supabase.from('users').update({ badges }).eq('id', userId).select().single();
    if (error) throw error;
    return data as DbUser;
  }
  return null;
};

// --- PERIOD LOGS ---
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
  const { data: periodData, error: periodError } = await supabase.from('period_logs').insert({
    user_id: userId,
    start_date: startDate,
    end_date: endDate,
    flow_intensity: flowIntensity,
    notes,
  }).select().single();

  if (periodError) throw periodError;

  const activeSymptoms = Object.entries(symptoms).filter(([_, active]) => active).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  if (Object.keys(activeSymptoms).length > 0 || severity !== 'mild') {
    const { error: symptomError } = await supabase.from('symptom_logs').insert({
      user_id: userId,
      log_date: startDate,
      symptoms_json: activeSymptoms,
      severity,
    });
    if (symptomError) throw symptomError;
  }

  const { data: allLogs } = await supabase.from('period_logs').select('start_date').eq('user_id', userId).order('start_date', { ascending: false });

  if (allLogs) {
    const newPredictions = calculateNextPredictions(startDate, allLogs, currentSettings);
    const updatePayload: Record<string, any> = {};
    if (newPredictions.lastPeriodStart !== undefined) updatePayload.last_period_start = newPredictions.lastPeriodStart;
    if (newPredictions.avgCycleLength !== undefined) updatePayload.avg_cycle_length = newPredictions.avgCycleLength;
    if (newPredictions.nextPredictedDate !== undefined) updatePayload.next_predicted_date = newPredictions.nextPredictedDate;
    if (newPredictions.pcosFlag !== undefined) updatePayload.pcos_flag = newPredictions.pcosFlag;
    updatePayload.updated_at = new Date().toISOString();

    const { error: cycleError } = await supabase.from('cycle_settings').update(updatePayload).eq('user_id', userId);
    if (cycleError) throw cycleError;
  }

  return periodData as DbPeriodLog;
};

export const getPeriodLogs = async (userId: string) => {
  const { data, error } = await supabase.from('period_logs').select('*').eq('user_id', userId).order('start_date', { ascending: false });
  if (error) throw error;
  return data as DbPeriodLog[];
};

export const getSymptomLogs = async (userId: string) => {
  const { data, error } = await supabase.from('symptom_logs').select('*').eq('user_id', userId).order('log_date', { ascending: false });
  if (error) throw error;
  return data;
};

// --- MOOD LOGS ---
export const saveMoodLog = async (userId: string, logDate: string, moods: string[], intensity: number, notes: string | null) => {
  const { data, error } = await supabase.from('mood_logs').insert({
    user_id: userId,
    log_date: logDate,
    moods,
    intensity,
    notes,
  }).select().single();
  if (error) throw error;
  return data as DbMoodLog;
};

export const getRecentMoodLogs = async (userId: string, limit = 14) => {
  const { data, error } = await supabase.from('mood_logs').select('*').eq('user_id', userId).order('log_date', { ascending: false }).limit(limit);
  if (error) throw error;
  return data as DbMoodLog[];
};

// --- CHAT SERVICE ---
export const createChatSession = async (userId: string, cyclePhase: string) => {
  const { data, error } = await supabase.from('chat_sessions').insert({ user_id: userId, cycle_phase: cyclePhase }).select().single();
  if (error) throw error;
  return data as DbChatSession;
};

export const saveMessage = async (sessionId: string, sender: 'user' | 'ai', message: string) => {
  const { data, error } = await supabase.from('chat_messages').insert({ session_id: sessionId, sender, message }).select().single();
  if (error) throw error;
  return data as DbChatMessage;
};

export const getChatHistory = async (sessionId: string) => {
  const { data, error } = await supabase.from('chat_messages').select('*').eq('session_id', sessionId).order('created_at', { ascending: true });
  if (error) throw error;
  return data as DbChatMessage[];
};

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const getAiResponse = async (message: string, cyclePhase: string, userName: string) => {
  if (!GEMINI_API_KEY) return "I'm sorry, my AI brain isn't connected right now (missing API key). But I'm still here for you! 💕";

  try {
    const mood = detectSentiment(message);
    const systemPrompt = buildSystemPrompt(mood, cyclePhase, userName);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 150, temperature: 0.7 }
      })
    });
    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) return data.candidates[0].content.parts[0].text;
    throw new Error('No response from Gemini');
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I'm having a little trouble thinking right now, but please know I'm here for you and listening. 🌸";
  }
};
