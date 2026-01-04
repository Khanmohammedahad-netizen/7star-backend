import { supabaseAdmin } from '../../config/supabase.js';

export async function fetchPaymentsByEvent(eventId, region) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .select(`
      *,
      events!inner(region)
    `)
    .eq('event_id', eventId)
    .eq('events.region', region)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function insertPayment(paymentData) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .insert([paymentData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePaymentById(paymentId, updates, region) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .update(updates)
    .eq('id', paymentId)
    .select(`
      *,
      events!inner(region)
    `)
    .eq('events.region', region)
    .single();

  if (error) return null;
  return data;
}
