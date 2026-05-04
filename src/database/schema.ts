import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'email', type: 'string' },
        { name: 'full_name', type: 'string' },
        { name: 'date_of_birth', type: 'string' },
        { name: 'avatar_url', type: 'string', isOptional: true },
        { name: 'theme', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'sync_version', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'cycle_settings',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'avg_cycle_length', type: 'number' },
        { name: 'avg_period_length', type: 'number' },
        { name: 'last_period_start', type: 'string', isOptional: true },
        { name: 'next_predicted_date', type: 'string', isOptional: true },
        { name: 'pcos_flag', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'period_logs',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'start_date', type: 'string' },
        { name: 'end_date', type: 'string', isOptional: true },
        { name: 'flow_intensity', type: 'string' },
        { name: 'last_modified', type: 'number' },
        { name: 'is_deleted', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'mood_logs',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'log_date', type: 'string' },
        { name: 'mood', type: 'string' },
        { name: 'intensity', type: 'number' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'last_modified', type: 'number' },
        { name: 'is_deleted', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'symptom_logs',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'log_date', type: 'string' },
        { name: 'symptoms_json', type: 'string' },
        { name: 'severity', type: 'string' },
        { name: 'last_modified', type: 'number' },
        { name: 'is_deleted', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'chat_sessions',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'cycle_phase', type: 'string' },
        { name: 'started_at', type: 'number' },
        { name: 'ended_at', type: 'number', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'chat_messages',
      columns: [
        { name: 'session_id', type: 'string', isIndexed: true },
        { name: 'sender', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
})
