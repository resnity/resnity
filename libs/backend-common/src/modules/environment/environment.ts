import { z } from 'zod';

const Environment = z.object({
  DB_NAME: z.string(),
  OAUTH2_AUDIENCE: z.string(),
  OAUTH2_CLIENT_ID: z.string(),
  OAUTH2_CLIENT_SECRET: z.string(),
  OAUTH2_DOMAIN: z.string(),
  MENU_DB_COLLECTION: z.string(),
  RESTAURANT_DB_COLLECTION: z.string(),
});
type Environment = z.infer<typeof Environment>;

const environment = Environment.parse(process.env);

export { environment };
export type { Environment };
