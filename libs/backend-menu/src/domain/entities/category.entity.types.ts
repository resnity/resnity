import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { ServiceSchedule } from '../value-objects/service-schedule.value-object';
import { ItemId } from './item.entity.types';

const Name = z.string().min(2).max(50);

export const CategoryId = EntityId.brand<'CategoryId'>();
export type CategoryId = z.infer<typeof CategoryId>;

export const CategoryName = Name.brand<'CategoryName'>();
export type CategoryName = z.infer<typeof CategoryName>;

export const CategoryServiceSchedule = z.instanceof(ServiceSchedule);
export type CategoryServiceSchedule = z.infer<typeof CategoryServiceSchedule>;

export const CategoryItemId = ItemId;
export type CategoryItemId = z.infer<typeof CategoryItemId>;

export type CreateCategoryPayload = {
  name: string;
  itemIds: string[];
  serviceSchedule: ServiceSchedule;
};

export const UpdateCategoryPayload = z.object({
  name: Name.optional().transform(CategoryName.parse),
  itemIds: z
    .string()
    .array()
    .transform((values) => values.map((value) => ItemId.parse(value))),
  serviceSchedule: z.instanceof(ServiceSchedule),
});
export type UpdateCategoryPayload = z.infer<typeof UpdateCategoryPayload>;
