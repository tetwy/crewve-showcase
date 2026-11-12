import { z } from 'zod';

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  NEXT_PUBLIC_TELEGRAM_BOT_USERNAME: z.string().default('crewve_bot'),
});

const serverSchema = clientSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  GROQ_API_KEY: z.string().min(20),
  TELEGRAM_BOT_TOKEN: z.string().min(20),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(10),
});

export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_TELEGRAM_BOT_USERNAME:
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME,
});

// Sadece server tarafinda cagir (API routes, server components)
export function getServerEnv() {
  return serverSchema.parse(process.env);
}
