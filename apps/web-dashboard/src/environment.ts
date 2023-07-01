import { z } from 'zod';

const environmentSchema = z.object({
  VITE_OAUTH2_AUDIENCE: z.string(),
  VITE_OAUTH2_CLIENT_ID: z.string(),
  VITE_OAUTH2_DOMAIN: z.string(),
});

export const environment = environmentSchema.parse(import.meta.env);
