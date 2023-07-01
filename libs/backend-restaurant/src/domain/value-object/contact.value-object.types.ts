import { z } from 'zod';

export const ContactPhoneNumber = z
  .string()
  .min(8)
  .max(20)
  .brand<'ContactPhoneNumber'>();
export type ContactPhoneNumber = z.infer<typeof ContactPhoneNumber>;

export const ContactEmail = z.string().email().brand<'ContactEmail'>();
export type ContactEmail = z.infer<typeof ContactEmail>;

export type CreateContactPayload = {
  phoneNumber: string;
  email: string;
};
