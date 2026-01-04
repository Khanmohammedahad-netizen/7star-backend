import { supabaseAdmin } from '../config/supabase.js';

export async function auditLog({
  userId,
  action,
  entity,
  entityId,
  region
}) {
  await supabaseAdmin.from('audit_logs').insert([
    {
      user_id: userId,
      action,
      entity,
      entity_id: entityId,
      region
    }
  ]);
}
