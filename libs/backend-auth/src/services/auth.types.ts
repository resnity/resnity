import { z } from 'zod';

import { Permission } from '../auth.types';

export const User = z.object({
  sub: z.string(),
  name: z.string().optional(),
  email: z.string(),
  email_verified: z.boolean(),
  permissions: z.array(z.nativeEnum(Permission)).default([]),

  nickname: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  middle_name: z.string().optional(),
  preferred_username: z.string().optional(),
  profile: z.string().optional(),
  picture: z.string().optional(),
  website: z.string().optional(),
  gender: z.string().optional(),
  birthdate: z.string().optional(),
  zoneinfo: z.string().optional(),
  locale: z.string().optional(),
  phone_number: z.string().optional(),
  phone_number_verified: z.boolean().optional(),
  address: z.string().optional(),
  updated_at: z.string(),
});

export type User = z.infer<typeof User>;
