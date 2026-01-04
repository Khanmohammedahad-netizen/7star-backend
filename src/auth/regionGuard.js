import { supabaseAdmin } from '../config/supabase.js';

export async function regionGuard(req, res, next) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('region')
    .eq('id', req.user.id)
    .single();

  if (error || !data) {
    return res.status(403).json({ error: 'Region access denied' });
  }

  req.user.region = data.region;
  next();
}
