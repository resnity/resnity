import { z } from 'zod';

export const createMenuFormSchema = z.object({
  name: z.string().min(3).max(255),
});

export type CreateMenuFormData = z.infer<typeof createMenuFormSchema>;
