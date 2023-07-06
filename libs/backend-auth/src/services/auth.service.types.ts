import { z } from 'zod';

import { Permission } from '../auth.types';

export const userSchema = z.object({
  sub: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  permissions: z.array(z.nativeEnum(Permission)).default([]),
});

export type User = z.infer<typeof userSchema>;
