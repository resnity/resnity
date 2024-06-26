import { z } from 'zod';

import { Permission } from '../auth.types';

export const userSchema = z.object({
  sub: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  org_id: z.string(),
  permissions: z.nativeEnum(Permission).array().default([]),
});

export type User = z.infer<typeof userSchema>;
