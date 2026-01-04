import { supabaseAdmin } from '../../config/supabase.js';

export async function fetchUsersByRegion(region) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, email, full_name, role, region, created_at')
    .eq('region', region)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createAuthUser(email, password) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) throw error;
  return data.user;
}

export async function insertUserProfile(profile) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([profile])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId, updates, region) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(updates)
    .eq('id', userId)
    .eq('region', region)
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function deleteUserProfile(userId, region) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .delete()
    .eq('id', userId)
    .eq('region', region)
    .select()
    .single();

  if (error || !data) return false;
  return true;
}
