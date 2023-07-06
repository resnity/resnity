import { AutoMap } from '@automapper/classes';

import {
  AggregateRoot,
  BaseEntityPayload,
  DomainError,
  createEntityId,
  isNil,
  isUndefined,
} from '@resnity/backend-common';

import {
  RestaurantId,
  assertRestaurantIdValid,
} from './common/restaurant.types';
import { Category } from './entities/category.entity';
import {
  CategoryId,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  assertCategoryIdValid,
} from './entities/category.entity.types';
import { Item } from './entities/item.entity';
import {
  CreateItemPayload,
  ItemId,
  UpdateItemPayload,
  assertItemIdValid,
} from './entities/item.entity.types';
import { Modifier } from './entities/modifier.entity';
import {
  CreateModifierPayload,
  ModifierId,
  UpdateModifierPayload,
  assertModifierIdValid,
} from './entities/modifier.entity.types';
import {
  CreateMenuPayload,
  MenuId,
  MenuName,
  UpdateMenuPayload,
  assertMenuIdValid,
  assertMenuNameValid,
} from './menu.aggregate-root.types';
import {
  CategoryAddedDomainEvent,
  MenuCreatedDomainEvent,
  MenuRemovedDomainEvent,
} from './menu.domain-events';
import { MenuErrorCode } from './menu.errors';

export class Menu extends AggregateRoot<MenuId> {
  private _restaurantId: RestaurantId;
  private _name: MenuName;
  private _categories: Category[];
  private _items: Item[];
  private _modifiers: Modifier[];

  static create(payload: CreateMenuPayload) {
    const menu = Menu.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });

    menu._addEvent(
      new MenuCreatedDomainEvent({
        aggregateId: menu.id,
        name: menu.name,
        restaurantId: menu.restaurantId,
      }),
    );

    return menu;
  }

  static new(payload: BaseEntityPayload<CreateMenuPayload>) {
    assertMenuIdValid(payload.id);
    assertRestaurantIdValid(payload.restaurantId);
    assertMenuNameValid(payload.name);

    const menu = new Menu();
    menu.id = payload.id;
    menu.createdAt = payload.createdAt;
    menu.updatedAt = payload.updatedAt;
    menu.restaurantId = payload.restaurantId;
    menu.name = payload.name;
    menu.categories = payload.categories.map(Category.create);
    menu.items = payload.items.map(Item.create);
    menu.modifiers = payload.modifiers.map(Modifier.create);
    return menu;
  }

  update(payload: UpdateMenuPayload) {
    this._update(payload);
    this._setUpdatedAtToNow();
  }

  remove() {
    this._addEvent(new MenuRemovedDomainEvent({ aggregateId: this.id }));
  }

  addCategory(payload: CreateCategoryPayload) {
    const category = this._addCategory(payload);
    this._setUpdatedAtToNow();

    this._addEvent(
      new CategoryAddedDomainEvent({
        aggregateId: this.id,
        categoryId: category.id,
        categoryName: category.name,
      }),
    );

    return category.id;
  }

  updateCategoryById(categoryId: string, payload: UpdateCategoryPayload) {
    assertCategoryIdValid(categoryId);
    this._updateCategoryById(categoryId, payload);
    this._setUpdatedAtToNow();
  }

  removeCategoryById(categoryId: string) {
    assertCategoryIdValid(categoryId);
    this._removeCategoryById(categoryId);
    this._setUpdatedAtToNow();
  }

  addItem(payload: CreateItemPayload) {
    const item = this._addItem(payload);
    this._setUpdatedAtToNow();
    return item.id;
  }

  updateItemById(itemId: string, payload: UpdateItemPayload) {
    assertItemIdValid(itemId);
    this._updateItemById(itemId, payload);
    this._setUpdatedAtToNow();
  }

  removeItemById(itemId: string) {
    assertItemIdValid(itemId);
    this._removeItemById(itemId);
    this._setUpdatedAtToNow();
  }

  addModifier(payload: CreateModifierPayload) {
    const modifier = this._addModifier(payload);
    this._setUpdatedAtToNow();
    return modifier.id;
  }

  updateModifierById(modifierId: string, payload: UpdateModifierPayload) {
    assertModifierIdValid(modifierId);
    this._updateModifierById(modifierId, payload);
    this._setUpdatedAtToNow();
  }

  removeModifierById(modifierId: string) {
    assertModifierIdValid(modifierId);
    this._removeModifierById(modifierId);
    this._setUpdatedAtToNow();
  }

  private _update(payload: UpdateMenuPayload) {
    if (!isUndefined(payload.name)) {
      assertMenuNameValid(payload.name);
      this._name = payload.name;
    }
  }

  private _addCategory(payload: CreateCategoryPayload) {
    const category = Category.create(payload);

    if (!this._isCategoryExistsByName(category.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NAME_ALREADY_EXISTS);
    if (!this._areCategoryItemsExistInMenu(category.itemIds))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    this._categories.push(category);
    return category;
  }

  private _updateCategoryById(
    categoryId: CategoryId,
    payload: UpdateCategoryPayload,
  ) {
    const category = this._getCategoryById(categoryId);
    if (isNil(category))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NOT_FOUND);
    category.update(payload);
  }

  private _removeCategoryById(categoryId: CategoryId) {
    const category = this._getCategoryById(categoryId);
    if (isNil(category))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NOT_FOUND);

    const indexToRemove = this._categories.findIndex(
      (category) => category.id === categoryId,
    );
    this._categories.splice(indexToRemove, 1);
  }

  private _addItem(payload: CreateItemPayload) {
    const item = Item.create(payload);

    if (!this._isItemExistsByName(item.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NAME_ALREADY_EXISTS);

    this._items.push(item);
    return item;
  }

  private _updateItemById(itemId: ItemId, payload: UpdateItemPayload) {
    const item = this._getItemById(itemId);
    if (isNil(item))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    // TODO: Check if modifiers exists in menu
    // TDDO: Check if category exists in menu

    item.update(payload);
  }

  private _removeItemById(itemId: ItemId) {
    const item = this._getItemById(itemId);
    if (isNil(item))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    const indexToRemove = this._items.findIndex((item) => item.id === itemId);
    this._items.splice(indexToRemove, 1);

    this._categories.forEach((category) => category.removeItemById(itemId));
    this._modifiers
      .filter((modifier) => modifier.itemId === itemId)
      .forEach((modifier) => this._removeModifierById(modifier.id));
  }

  private _addModifier(payload: CreateModifierPayload) {
    const modifier = Modifier.create(payload);

    if (!this._isModifierExistsByName(payload.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NAME_ALREADY_EXISTS);
    // TODO: Extra validation

    this._modifiers.push(modifier);
    return modifier;
  }

  private _updateModifierById(
    modifierId: ModifierId,
    payload: UpdateModifierPayload,
  ) {
    const modifier = this._getModifierById(modifierId);

    if (isNil(modifier))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NOT_FOUND);
    // TODO: Extra validation

    modifier.update(payload);
  }

  private _removeModifierById(modifierId: ModifierId) {
    const modifier = this._getModifierById(modifierId);

    if (isNil(modifier))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NOT_FOUND);
    // TODO: Extra validation

    const indexToRemove = this._modifiers.findIndex(
      (modifier) => modifier.id === modifierId,
    );
    this._modifiers.splice(indexToRemove, 1);
  }

  private _areCategoryItemsExistInMenu(itemIds: ItemId[]) {
    return itemIds.some((itemId) => this._isCategoryItemExistsInMenu(itemId));
  }

  private _isCategoryItemExistsInMenu(itemId: ItemId) {
    return this._isItemExistsById(itemId);
  }

  private _getCategoryById(categoryId: CategoryId) {
    return this._categories.find((category) => category.id === categoryId);
  }

  private _getItemById(itemId: ItemId) {
    return this._items.find((item) => item.id === itemId);
  }

  private _getModifierById(modifierId: ModifierId) {
    return this._modifiers.find((modifier) => modifier.id === modifierId);
  }

  private _isItemExistsById(itemId: ItemId) {
    return this._items.some((item) => item.id === itemId);
  }

  private _isModifierExistsById(modifierId: ModifierId) {
    return this._modifiers.some((modifier) => modifier.id === modifierId);
  }

  private _isCategoryExistsByName(name: string) {
    return this._categories.some((category) => category.name === name);
  }

  private _isItemExistsByName(name: string) {
    return this._items.some((item) => item.name === name);
  }

  private _isModifierExistsByName(name: string) {
    return this._modifiers.some((modifier) => modifier.name === name);
  }

  @AutoMap(() => String)
  get restaurantId(): RestaurantId {
    return this._restaurantId;
  }
  set restaurantId(value: RestaurantId) {
    this._restaurantId = value;
  }

  @AutoMap(() => String)
  get name(): MenuName {
    return this._name;
  }
  set name(value: MenuName) {
    this._name = value;
  }

  @AutoMap(() => [Category])
  get categories(): Category[] {
    return this._categories;
  }
  set categories(value: Category[]) {
    this._categories = value;
  }

  @AutoMap(() => [Item])
  get items(): Item[] {
    return this._items;
  }
  set items(value: Item[]) {
    this._items = value;
  }

  @AutoMap(() => [Modifier])
  get modifiers(): Modifier[] {
    return this._modifiers;
  }
  set modifiers(value: Modifier[]) {
    this._modifiers = value;
  }
}
