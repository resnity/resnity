import { validateOrThrowDomainError } from '@resnity/backend-common';

import { ServiceSchedule } from '../value-objects/service-schedule.value-object';
import {
  CategoryId,
  CategoryItemId,
  CategoryName,
  CategoryServiceSchedule,
} from './category.entity.types';

type AssertCategoryId = (id: string) => asserts id is CategoryId;
export const assertCategoryId: AssertCategoryId = (id: string) =>
  validateOrThrowDomainError(CategoryId, id);

type AssertCategoryName = (name: string) => asserts name is CategoryName;
export const assertCategoryName: AssertCategoryName = (name: string) =>
  validateOrThrowDomainError(CategoryName, name);

type AssertCategoryServiceSchedule = (
  serviceSchedule: ServiceSchedule,
) => asserts serviceSchedule is CategoryServiceSchedule;
export const assertCategoryServiceSchedule: AssertCategoryServiceSchedule = (
  serviceSchedule: ServiceSchedule,
) => validateOrThrowDomainError(CategoryServiceSchedule, serviceSchedule);

type AssertCategoryItemIds = (
  itemIds: string[],
) => asserts itemIds is CategoryItemId[];
export const assertCategoryItemIds: AssertCategoryItemIds = (
  itemIds: string[],
) => validateOrThrowDomainError(CategoryItemId.array(), itemIds);
