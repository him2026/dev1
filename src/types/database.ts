export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  date_of_birth: string;
  theme: string;
  notifications_enabled: boolean;
  created_at: string;
}

export interface DbCycleSettings {
  user_id: string;
  avg_cycle_length: number;
  avg_period_length: number;
  last_period_start: string | null;
  next_predicted_date: string | null;
  pcos_flag: boolean;
  updated_at: string;
}

export interface DbMoodLog {
  id: string;
  user_id: string;
  log_date: string;
  moods: string[];
  intensity: number;
  notes: string | null;
  created_at: string;
}

export interface DbPeriodLog {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  flow_intensity: string | null;
  notes: string | null;
  created_at: string;
}

export interface DbChatSession {
  id: string;
  user_id: string;
  cycle_phase: string;
  started_at: string;
  ended_at: string | null;
}

export interface DbChatMessage {
  id: string;
  session_id: string;
  sender: 'user' | 'ai';
  message: string;
  created_at: string;
}
