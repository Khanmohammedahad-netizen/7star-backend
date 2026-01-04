import { supabaseAdmin } from '../../config/supabase.js';

export async function fetchEvents(region) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('region', region)
    .order('event_date', { ascending: true });

  if (error) throw error;
  return data;
}

export async function fetchEventById(eventId, region) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('id', eventId)
    .eq('region', region)
    .single();

  if (error) return null;
  return data;
}

export async function insertEvent(eventData) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .insert([eventData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEventById(eventId, updates, region) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .update(updates)
    .eq('id', eventId)
    .eq('region', region)
    .select()
    .single();

  if (error) return null;
  return data;
}
