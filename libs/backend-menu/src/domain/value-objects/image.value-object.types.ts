import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const imageUrlSchema = z.string().url().brand<'ImageUrl'>();

export const assertImageUrlValid: Validate<typeof imageUrlSchema> =
  domainSchemaValidatorBuilder(imageUrlSchema);

export type ImageUrl = z.infer<typeof imageUrlSchema>;

export type CreateImagePayload = {
  url: string;
};
