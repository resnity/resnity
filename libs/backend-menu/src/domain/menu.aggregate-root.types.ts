import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateCategoryPayload } from './entities/category.entity.types';
import { CreateItemPayload } from './entities/item.entity.types';
import { CreateModifierPayload } from './entities/modifier.entity.types';

const menuIdSchema = EntityId.brand<'MenuId'>();

const menuNameSchema = z.string().brand<'MenuName'>();

export const assertMenuIdValid: Validate<typeof menuIdSchema> =
  domainSchemaValidatorBuilder(menuIdSchema);

export const assertMenuNameValid: Validate<typeof menuNameSchema> =
  domainSchemaValidatorBuilder(menuNameSchema);

export type MenuId = z.infer<typeof menuIdSchema>;

export type MenuName = z.infer<typeof menuNameSchema>;

export type CreateMenuPayload = {
  restaurantId: string;
  name: string;
  categories: CreateCategoryPayload[];
  items: CreateItemPayload[];
  modifiers: CreateModifierPayload[];
};

export type UpdateMenuPayload = {
  name?: string;
};
