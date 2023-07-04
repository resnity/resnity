import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const menuIdSchema = EntityId.brand<'MenuId'>();
const menuIdsSchema = menuIdSchema.array();

export const assertMenuIdValid: Validate<typeof menuIdSchema> =
  domainSchemaValidatorBuilder(menuIdSchema);
export const assertMenuIdsValid: Validate<typeof menuIdsSchema> =
  domainSchemaValidatorBuilder(menuIdsSchema);

export type MenuId = z.infer<typeof menuIdSchema>;
