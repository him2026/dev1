import { supabase } from '../database/supabase';
import { DbChatSession, DbChatMessage } from '../types/database';
import { buildSystemPrompt, detectSentiment } from './ai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const createChatSession = async (userId: string, cyclePhase: string) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      user_id: userId,
      cycle_phase: cyclePhase,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbChatSession;
};

export const saveMessage = async (sessionId: string, sender: 'user' | 'ai', message: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      sender,
      message,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbChatMessage;
};

export const getChatHistory = async (sessionId: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as DbChatMessage[];
};

export const getAiResponse = async (
  message: string,
  cyclePhase: string,
  userName: string
) => {
  if (!GEMINI_API_KEY) {
    return "I'm sorry, my AI brain isn't connected right now (missing API key). But I'm still here for you! 💕";
  }

  try {
    const mood = detectSentiment(message);
    const systemPrompt = buildSystemPrompt(mood, cyclePhase, userName);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7,
        }
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('No response from Gemini');
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I'm having a little trouble thinking right now, but please know I'm here for you and listening. 🌸";
  }
};
