import { synchronize } from '@nozbe/watermelondb/sync';
// Adjust import path for your database instance if needed
import { database } from './index'; 
import { supabase } from './supabase';

export async function syncWithSupabase() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      // Fetch changes from Supabase since lastPulledAt
      const { data, error } = await supabase.rpc('pull_watermelondb_changes', {
        last_pulled_at: lastPulledAt || 0,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        changes: data.changes,
        timestamp: data.timestamp,
      };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      // Push local changes to Supabase
      const { error } = await supabase.rpc('push_watermelondb_changes', {
        changes,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    migrationsEnabledAtVersion: 1,
  });
}
