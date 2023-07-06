import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreatePricePayload } from '../value-objects/price.value-object.types';

const modifierIdSchema = EntityId.brand<'ModifierId'>();
const modifierIdsSchema = modifierIdSchema.array();

const modifierNameSchema = z.string().min(2).max(50).brand<'ModifierName'>();

const modifierMinSelectionSchema = z
  .number()
  .int()
  .nonnegative()
  .brand<'ModifierMinSelection'>();

const modifierMaxSelectionSchema = z
  .number()
  .int()
  .nonnegative()
  .brand<'ModifierMaxSelection'>();

const modifierIsRepeatableSchema = z.boolean().brand<'ModifierIsRepeatable'>();

export const assertModifierIdValid: Validate<typeof modifierIdSchema> =
  domainSchemaValidatorBuilder(modifierIdSchema);
export const assertModifierIdsValid: Validate<typeof modifierIdsSchema> =
  domainSchemaValidatorBuilder(modifierIdsSchema);

export const assertModifierNameValid: Validate<typeof modifierNameSchema> =
  domainSchemaValidatorBuilder(modifierNameSchema);

export const assertModifierMinSelectionValid: Validate<
  typeof modifierMinSelectionSchema
> = domainSchemaValidatorBuilder(modifierMinSelectionSchema);

export const assertModifierMaxSelectionValid: Validate<
  typeof modifierMaxSelectionSchema
> = domainSchemaValidatorBuilder(modifierMaxSelectionSchema);

export const assertModifierIsRepeatableValid: Validate<
  typeof modifierIsRepeatableSchema
> = domainSchemaValidatorBuilder(modifierIsRepeatableSchema);

export type ModifierId = z.infer<typeof modifierIdSchema>;

export type ModifierName = z.infer<typeof modifierNameSchema>;

export type ModifierMinSelection = z.infer<typeof modifierMinSelectionSchema>;

export type ModifierMaxSelection = z.infer<typeof modifierMaxSelectionSchema>;

export type ModifierIsRepeatable = z.infer<typeof modifierIsRepeatableSchema>;

export type CreateModifierPayload = {
  itemId: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  isRepeatable: boolean;
  price: CreatePricePayload;
};
