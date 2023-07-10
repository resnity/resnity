import { z } from 'zod';

import { Permission } from '../auth.types';

export const JwtPayload = z.object({
  iss: z.string().optional(),
  sub: z.string().optional(),
  aud: z.union([z.string(), z.array(z.string())]),
  jti: z.string().optional(),
  nbf: z.number().optional(),
  exp: z.number().optional(),
  iat: z.number().optional(),
  permissions: z.array(z.nativeEnum(Permission)).default([]),
  org_id: z.string(),
});

export type JwtPayload = z.infer<typeof JwtPayload>;
