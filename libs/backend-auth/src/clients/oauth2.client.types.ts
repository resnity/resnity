import { z } from 'zod';

export const userInfoSchema = z.object({
  sub: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

export type OAuth2Client = {
  getUserInfo(accessToken: string): Promise<UserInfo>;
};
