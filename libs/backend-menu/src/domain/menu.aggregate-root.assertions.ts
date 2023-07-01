import { validateOrThrowDomainError } from '@resnity/backend-common';

import { Category } from './entities/category.entity';
import { Item } from './entities/item.entity';
import { Modifier } from './entities/modifier.entity';
import {
  MenuCategory,
  MenuId,
  MenuItem,
  MenuModifier,
  MenuName,
  MenuRestaurantId,
} from './menu.aggregate-root.types';

type AssertMenuId = (value: string) => asserts value is MenuId;
export const assertMenuId: AssertMenuId = (value: string) =>
  validateOrThrowDomainError(MenuId, value);

type AssertMenuRestaurantId = (
  value: string,
) => asserts value is MenuRestaurantId;
export const assertMenuRestaurantId: AssertMenuRestaurantId = (value: string) =>
  validateOrThrowDomainError(MenuRestaurantId, value);

type AssertMenuName = (value: string) => asserts value is MenuName;
export const assertMenuName: AssertMenuName = (value: string) =>
  validateOrThrowDomainError(MenuName, value);

type AssertMenuCategory = (value: Category) => asserts value is MenuCategory;
export const assertMenuCategory: AssertMenuCategory = (value: Category) =>
  validateOrThrowDomainError(MenuCategory, value);

type AssertMenuCategories = (
  values: Category[],
) => asserts values is MenuCategory[];
export const assertMenuCategories: AssertMenuCategories = (
  values: Category[],
) => validateOrThrowDomainError(MenuCategory.array(), values);

type AssertMenuItem = (value: Item) => asserts value is MenuItem;
export const assertMenuItem: AssertMenuItem = (value: Item) =>
  validateOrThrowDomainError(MenuItem, value);

type AssertMenuItems = (values: Item[]) => asserts values is MenuItem[];
export const assertMenuItems: AssertMenuItems = (values: Item[]) =>
  validateOrThrowDomainError(MenuItem.array(), values);

type AssertMenuModifier = (value: Modifier) => asserts value is MenuModifier;
export const assertMenuModifier: AssertMenuModifier = (value: Modifier) =>
  validateOrThrowDomainError(MenuModifier, value);

type AssertMenuModifiers = (
  values: Modifier[],
) => asserts values is MenuModifier[];
export const assertMenuModifiers: AssertMenuModifiers = (values: Modifier[]) =>
  validateOrThrowDomainError(MenuModifier.array(), values);
