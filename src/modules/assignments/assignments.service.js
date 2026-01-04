import { supabaseAdmin } from '../../config/supabase.js';

export async function fetchAssignmentsByEvent(eventId, region) {
  const { data, error } = await supabaseAdmin
    .from('event_assignments')
    .select(`
      id,
      users (
        id,
        full_name,
        role
      ),
      events!inner(region)
    `)
    .eq('event_id', eventId)
    .eq('events.region', region);

  if (error) throw error;
  return data;
}

export async function insertAssignment(payload) {
  const { data, error } = await supabaseAdmin
    .from('event_assignments')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAssignmentById(id, region) {
  const { data, error } = await supabaseAdmin
    .from('event_assignments')
    .delete()
    .select(`
      id,
      events!inner(region)
    `)
    .eq('id', id)
    .eq('events.region', region)
    .single();

  if (error || !data) return false;
  return true;
}
