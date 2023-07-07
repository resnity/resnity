import { z } from 'zod';

export const createMenuFormSchema = z.object({
  name: z.string().min(2).max(50),
});

export type CreateMenuFormData = z.infer<typeof createMenuFormSchema>;
