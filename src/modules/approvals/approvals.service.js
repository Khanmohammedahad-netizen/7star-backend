import { supabaseAdmin } from '../../config/supabase.js';

export async function approveEventById(id, user) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .update({
      approval_status: 'approved',
      approved_by: user.id,
      approved_at: new Date()
    })
    .eq('id', id)
    .eq('region', user.region)
    .select()
    .single();

  if (error) throw error;

  await logApproval('event', id, 'approved', user);
  return data;
}

export async function rejectEventById(id, user) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .update({
      approval_status: 'rejected',
      approved_by: user.id,
      approved_at: new Date()
    })
    .eq('id', id)
    .eq('region', user.region)
    .select()
    .single();

  if (error) throw error;

  await logApproval('event', id, 'rejected', user);
  return data;
}

export async function approvePaymentById(id, user) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .update({
      approval_status: 'approved',
      approved_by: user.id,
      approved_at: new Date()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await logApproval('payment', id, 'approved', user);
  return data;
}

export async function rejectPaymentById(id, user) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .update({
      approval_status: 'rejected',
      approved_by: user.id,
      approved_at: new Date()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await logApproval('payment', id, 'rejected', user);
  return data;
}

async function logApproval(entity, entityId, action, user) {
  await supabaseAdmin.from('approval_logs').insert([
    {
      entity,
      entity_id: entityId,
      action,
      performed_by: user.id,
      region: user.region
    }
  ]);
}
