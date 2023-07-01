import { z } from 'zod';

export const CreateRestaurantServicePayload = z.object({
  name: z.string(),
  userId: z.string(),
});
export type CreateRestaurantServicePayload = z.infer<
  typeof CreateRestaurantServicePayload
>;
