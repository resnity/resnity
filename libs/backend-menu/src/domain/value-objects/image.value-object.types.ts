import { z } from 'zod';

export const ImageUrl = z.string().url().brand<'ImageUrl'>();
export type ImageUrl = z.infer<typeof ImageUrl>;

export type CreateImagePayload = {
  url: string;
};
