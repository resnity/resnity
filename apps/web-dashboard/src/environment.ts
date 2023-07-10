import { z } from 'zod';

const environmentSchema = z.object({
  DEV: z.boolean(),
  VITE_OAUTH2_AUDIENCE: z.string(),
  VITE_OAUTH2_CLIENT_ID: z.string(),
  VITE_OAUTH2_DOMAIN: z.string(),
});

export const environment = environmentSchema.parse(import.meta.env);

export const isDev = environment.DEV;
