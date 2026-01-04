import { supabaseAdmin } from '../../config/supabase.js';

export async function fetchMaterialsByEvent(eventId, region) {
  const { data, error } = await supabaseAdmin
    .from('event_materials')
    .select(`
      *,
      events!inner(region)
    `)
    .eq('event_id', eventId)
    .eq('events.region', region);

  if (error) throw error;
  return data;
}

export async function insertMaterial(materialData) {
  const { data, error } = await supabaseAdmin
    .from('event_materials')
    .insert([materialData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMaterialById(materialId, updates, region) {
  const { data, error } = await supabaseAdmin
    .from('event_materials')
    .update(updates)
    .eq('id', materialId)
    .select(`
      *,
      events!inner(region)
    `)
    .eq('events.region', region)
    .single();

  if (error) return null;
  return data;
}

export async function deleteMaterialById(materialId, region) {
  const { data, error } = await supabaseAdmin
    .from('event_materials')
    .delete()
    .select(`
      id,
      events!inner(region)
    `)
    .eq('id', materialId)
    .eq('events.region', region)
    .single();

  if (error || !data) return false;
  return true;
}
