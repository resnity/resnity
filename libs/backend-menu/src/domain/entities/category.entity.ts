import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  DomainError,
  Entity,
  createEntityId,
} from '@resnity/backend-common';

import { MenuErrorCode } from '../menu.errors';
import { ServiceSchedule } from '../value-objects/service-schedule.value-object';
import {
  assertCategoryId,
  assertCategoryItemIds,
  assertCategoryName,
  assertCategoryServiceSchedule,
} from './category.entity.assertions';
import {
  CategoryId,
  CategoryItemId,
  CategoryName,
  CategoryServiceSchedule,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from './category.entity.types';
import { assertItemId } from './item.entity.assertions';
import { ItemId } from './item.entity.types';

export class Category extends Entity<CategoryId> {
  private _name: CategoryName;
  private _itemIds: Set<CategoryItemId>;
  private _serviceSchedule: CategoryServiceSchedule;

  static create(payload: CreateCategoryPayload) {
    return Category.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateCategoryPayload>) {
    assertCategoryId(payload.id);
    assertCategoryName(payload.name);
    assertCategoryItemIds(payload.itemIds);
    assertCategoryServiceSchedule(payload.serviceSchedule);

    const category = new Category();
    category.createdAt = payload.createdAt;
    category.updatedAt = payload.updatedAt;
    category.id = payload.id;
    category.name = payload.name;
    category.itemIds = payload.itemIds;
    category.serviceSchedule = payload.serviceSchedule;
    return category;
  }

  async update(payload: UpdateCategoryPayload) {
    if (payload.name !== undefined) {
      assertCategoryName(payload.name);
      this._name = payload.name;
    }
    if (payload.itemIds !== undefined) {
      assertCategoryItemIds(payload.itemIds);
      this._itemIds = new Set(payload.itemIds);
    }
    if (payload.serviceSchedule !== undefined) {
      assertCategoryServiceSchedule(payload.serviceSchedule);
      this._serviceSchedule = payload.serviceSchedule;
    }
    this._setUpdatedAtToNow();
  }

  removeItemById(id: string) {
    assertItemId(id);
    this._removeItemById(id);
    this._setUpdatedAtToNow();
  }

  private _removeItemById(itemId: ItemId) {
    if (!this._itemIds.has(itemId))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_ITEM_NOT_FOUND);
    this._itemIds.delete(itemId);
  }

  @AutoMap()
  get name(): CategoryName {
    return this._name;
  }
  set name(value: CategoryName) {
    this._name = value;
  }

  @AutoMap()
  get serviceSchedule(): ServiceSchedule {
    return this._serviceSchedule;
  }
  set serviceSchedule(value: ServiceSchedule) {
    this._serviceSchedule = value;
  }

  @AutoMap()
  get itemIds(): CategoryItemId[] {
    return Array.from(this._itemIds);
  }
  set itemIds(value: CategoryItemId[]) {
    this._itemIds = new Set(value);
  }
}
