import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT,
  supabaseUrl: process.env.SUPABASE_URL,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  jwtSecret: process.env.SUPABASE_JWT_SECRET
};
