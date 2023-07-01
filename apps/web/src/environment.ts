import { z } from 'zod';

const environmentSchema = z.object({
  VITE_AUTH0_AUDIENCE: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
  VITE_AUTH0_DOMAIN: z.string(),
});

const environment = environmentSchema.parse(import.meta.env);

export { environment };
