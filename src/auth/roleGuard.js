import { supabaseAdmin } from '../config/supabase.js';

export function roleGuard(allowedRoles = []) {
  return async (req, res, next) => {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (error || !data) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!allowedRoles.includes(data.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    req.user.role = data.role;
    next();
  };
}
