import { z } from 'zod';

const envSchema = z.object({
  DEBUG_MODE: z.boolean().default(false),
  DEMO_MODE: z.boolean().default(false),
  API_URL: z.string().url(),
  AI_ENDPOINT: z.string().url(),
});

export type EnvConfig = z.infer<typeof envSchema>;

const env: EnvConfig = {
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  AI_ENDPOINT: import.meta.env.VITE_AI_ENDPOINT || 'http://localhost:3000/ai',
};

export const getConfig = (): EnvConfig => {
  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error('Environment configuration error:', error);
    throw error;
  }
};