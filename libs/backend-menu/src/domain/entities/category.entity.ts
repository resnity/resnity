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
  CategoryId,
  CategoryName,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  assertCategoryIdValid,
  assertCategoryNameValid,
} from './category.entity.types';
import {
  ItemId,
  assertItemIdValid,
  assertItemIdsValid,
} from './item.entity.types';

export class Category extends Entity<CategoryId> {
  private _name: CategoryName;
  private _itemIds: ItemId[];
  private _serviceSchedule: ServiceSchedule;

  static create(payload: CreateCategoryPayload) {
    return Category.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateCategoryPayload>) {
    assertCategoryIdValid(payload.id);
    assertCategoryNameValid(payload.name);
    assertItemIdsValid(payload.itemIds);

    const category = new Category();
    category.createdAt = payload.createdAt;
    category.updatedAt = payload.updatedAt;
    category.id = payload.id;
    category.name = payload.name;
    category.itemIds = payload.itemIds;
    category.serviceSchedule = ServiceSchedule.create(payload.serviceSchedule);
    return category;
  }

  async update(payload: UpdateCategoryPayload) {
    this._update(payload);
    this._setUpdatedAtToNow();
  }

  removeItemById(id: string) {
    assertItemIdValid(id);
    this._removeItemById(id);
    this._setUpdatedAtToNow();
  }

  private _update(payload: UpdateCategoryPayload) {
    if (payload.name !== undefined) {
      assertCategoryNameValid(payload.name);
      this._name = payload.name;
    }
    if (payload.itemIds !== undefined) {
      assertItemIdsValid(payload.itemIds);
      this._itemIds = payload.itemIds;
    }
    if (payload.serviceSchedule !== undefined) {
      this._serviceSchedule = ServiceSchedule.create(payload.serviceSchedule);
    }
  }

  private _removeItemById(itemId: ItemId) {
    if (!this._itemIds.includes(itemId))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_ITEM_NOT_FOUND);
    const indexToRemove = this._itemIds.findIndex((id) => id === itemId);
    this._itemIds.splice(indexToRemove, 1);
  }

  @AutoMap()
  get name(): CategoryName {
    return this._name;
  }
  set name(value: CategoryName) {
    this._name = value;
  }

  @AutoMap()
  get itemIds(): ItemId[] {
    return this._itemIds;
  }
  set itemIds(value: ItemId[]) {
    this._itemIds = value;
  }

  @AutoMap()
  get serviceSchedule(): ServiceSchedule {
    return this._serviceSchedule;
  }
  set serviceSchedule(value: ServiceSchedule) {
    this._serviceSchedule = value;
  }
}
