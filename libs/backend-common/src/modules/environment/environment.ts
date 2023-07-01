import { z } from 'zod';

const Environment = z.object({
  DB_NAME: z.string(),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_DOMAIN: z.string(),
  MENU_DB_COLLECTION: z.string(),
  RESTAURANT_DB_COLLECTION: z.string(),
});
type Environment = z.infer<typeof Environment>;

const environment = Environment.parse(process.env);

export { environment };
export type { Environment };
