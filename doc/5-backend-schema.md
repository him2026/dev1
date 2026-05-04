# Backend Schema & Data Architecture

## 1. User Management (`users`)
- `id`: UUID (Primary Key)
- `full_name`: VARCHAR(255)
- `email`: VARCHAR(255) (Unique)
- `password_hash`: TEXT
- `date_of_birth`: DATE
- `created_at`: TIMESTAMP

## 2. Cycle Settings (`cycle_settings`)
- `user_id`: UUID (Foreign Key)
- `avg_cycle_length`: INT (Default 28)
- `avg_period_length`: INT (Default 5)
- `last_period_start`: DATE
- `next_predicted_date`: DATE

## 3. Wellness Logs
- **`mood_logs`**: `user_id`, `mood_id`, `intensity`, `log_date`
- **`symptom_logs`**: `user_id`, `symptom_id`, `severity`, `log_date`
- **`period_logs`**: `user_id`, `start_date`, `end_date`, `flow_intensity`

## 4. AI Chat History
- **`chat_sessions`**: `id`, `user_id`, `title`, `phase_at_start`, `created_at`
- **`chat_messages`**: `session_id`, `sender` (user/ai), `text`, `timestamp`

## 5. Gamification
- **`badges`**: `id`, `name`, `description`, `icon`, `points_value`
- **`user_badges`**: `user_id`, `badge_id`, `earned_at`
- **`challenges`**: `id`, `title`, `duration_days`, `points_reward`

## 6. Offline Sync Logic
- **WatermelonDB Sync**: Uses a `last_pulled_at` timestamp to synchronize local SQLite changes with Supabase via a dedicated sync endpoint.
- **Conflict Resolution**: "Last write wins" for mood/symptom logs; logical merging for cycle prediction settings.
