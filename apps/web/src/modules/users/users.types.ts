import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  photoUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type User = z.infer<typeof userSchema>;

export { userSchema };
export type { User };
