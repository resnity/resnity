import { validateOrThrowDomainError } from '@resnity/backend-common';

import { ImageUrl } from './image.value-object.types';

type AssertImageUrl = (value: string) => asserts value is ImageUrl;
export const assertImageUrl: AssertImageUrl = (value: string) =>
  validateOrThrowDomainError(ImageUrl, value);
