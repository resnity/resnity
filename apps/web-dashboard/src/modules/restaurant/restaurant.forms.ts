import { z } from 'zod';

export const createRestaurantFormSchema = z.object({
  name: z.string().min(2).max(50),
});
