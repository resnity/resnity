import { z } from 'zod';

import { BaseEntityPayload, EntityId } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import { ItemId } from './item.entity.types';

export const ModifierId = EntityId.brand<'ModifierId'>();
export type ModifierId = z.infer<typeof ModifierId>;

export const ModifierItemId = ItemId;
export type ModifierItemId = z.infer<typeof ModifierId>;

export const ModifierName = z.string().min(2).max(50).brand<'ModifierName'>();
export type ModifierName = z.infer<typeof ModifierName>;

export const ModifierMinSelection = z.number().int().nonnegative();
export type ModifierMinSelection = z.infer<typeof ModifierMinSelection>;

export const ModifierMaxSelection = z.number().int().nonnegative();
export type ModifierMaxSelection = z.infer<typeof ModifierMaxSelection>;

export const ModifierIsRepeatable = z.boolean();
export type ModifierIsRepeatable = z.infer<typeof ModifierIsRepeatable>;

export const ModifierPrice = z.instanceof(Price);
export type ModifierPrice = z.infer<typeof ModifierPrice>;

export type CreateModifierPayload = {
  itemId: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  isRepeatable: boolean;
  price: Price;
};

export type NewModifierPayload = BaseEntityPayload<CreateModifierPayload>;
