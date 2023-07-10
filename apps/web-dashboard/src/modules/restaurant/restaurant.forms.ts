import { z } from 'zod';

export const createRestaurantFormSchema = z.object({
  name: z.string().min(3).max(255),
});

export type CreateRestaurantFormData = z.infer<
  typeof createRestaurantFormSchema
>;
