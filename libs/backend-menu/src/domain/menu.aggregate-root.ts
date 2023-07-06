import { AutoMap } from '@automapper/classes';

import {
  AggregateRoot,
  BaseEntityPayload,
  DomainError,
  createEntityId,
  isUndefined,
} from '@resnity/backend-common';

import {
  RestaurantId,
  assertRestaurantIdValid,
} from './common/restaurant.types';
import { Category } from './entities/category.entity';
import {
  CategoryId,
  assertCategoryIdValid,
} from './entities/category.entity.types';
import { Item } from './entities/item.entity';
import { ItemId, assertItemIdValid } from './entities/item.entity.types';
import { Modifier } from './entities/modifier.entity';
import {
  ModifierId,
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
  CategoryRemovedDomainEvent,
  ItemAddedDomainEvent,
  ItemRemovedDomainEvent,
  MenuCreatedDomainEvent,
  MenuRemovedDomainEvent,
  ModifierAddedDomainEvent,
  ModifierRemovedDomainEvent,
} from './menu.domain-events';
import { MenuErrorCode } from './menu.errors';

export class Menu extends AggregateRoot<MenuId> {
  private _restaurantId: RestaurantId;
  private _name: MenuName;
  private _categories: Category[];
  private _items: Item[];
  private _modifiers: Modifier[];

  static async create(payload: CreateMenuPayload) {
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

  _update(payload: UpdateMenuPayload) {
    if (!isUndefined(payload.name)) {
      assertMenuNameValid(payload.name);
      this._name = payload.name;
    }
  }

  addCategory(category: Category) {
    this._addCategory(category);
    this._addEvent(
      new CategoryAddedDomainEvent({
        aggregateId: this.id,
        categoryId: category.id,
        categoryName: category.name,
      }),
    );
    this._setUpdatedAtToNow();
  }

  addItem(item: Item) {
    this._addItem(item);
    this._addEvent(
      new ItemAddedDomainEvent({
        aggregateId: this.id,
        itemId: item.id,
        itemName: item.name,
      }),
    );
    this._setUpdatedAtToNow();
  }

  addModifier(modifier: Modifier) {
    this._addModifier(modifier);
    this._addEvent(
      new ModifierAddedDomainEvent({
        aggregateId: this.id,
        modifierId: modifier.id,
        modifierName: modifier.name,
      }),
    );
    this._setUpdatedAtToNow();
  }

  removeCategoryById(id: string) {
    assertCategoryIdValid(id);

    this._removeCategoryById(id);
    this._addEvent(
      new CategoryRemovedDomainEvent({
        aggregateId: this.id,
        categoryId: id,
      }),
    );
    this._setUpdatedAtToNow();
  }

  removeItemById(id: string) {
    assertItemIdValid(id);

    this._removeItemById(id);
    this._addEvent(
      new ItemRemovedDomainEvent({
        aggregateId: this.id,
        itemId: id,
      }),
    );
    this._setUpdatedAtToNow();
  }

  removeModifierById(id: string) {
    assertModifierIdValid(id);

    this._removeModifierById(id);
    this._addEvent(
      new ModifierRemovedDomainEvent({
        aggregateId: this.id,
        modifierId: id,
      }),
    );
    this._setUpdatedAtToNow();
  }

  private _addCategory(category: Category) {
    if (!this._isCategoryExistsByName(category.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NAME_ALREADY_EXISTS);
    if (!this._areAllCategoryItemsExistByIdInMenu(category.itemIds))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    this._categories.push(category);
  }

  private _addItem(item: Item) {
    if (!this._isItemExistsByName(item.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NAME_ALREADY_EXISTS);

    this._items.push(item);
  }

  private _addModifier(modifier: Modifier) {
    if (!this._isModifierExistsByName(modifier.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NAME_ALREADY_EXISTS);

    this._modifiers.push(modifier);
  }

  private _removeCategoryById(categoryId: CategoryId) {
    if (!this._isCategoryExistsById(categoryId))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NOT_FOUND);

    const indexToRemove = this._categories.findIndex(
      (category) => category.id === categoryId,
    );
    this._categories.splice(indexToRemove, 1);
  }

  private _removeItemById(itemId: ItemId) {
    if (!this._isItemExistsById(itemId))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    const indexToRemove = this._items.findIndex((item) => item.id === itemId);
    this._items.splice(indexToRemove, 1);

    this._categories.forEach((category) => category.removeItemById(itemId));
    this._modifiers
      .filter((modifier) => modifier.itemId === itemId)
      .forEach((modifier) => this._removeModifierById(modifier.id));
  }

  private _removeModifierById(modifierId: ModifierId) {
    if (!this._isModifierExistsById(modifierId))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NOT_FOUND);

    const indexToRemove = this._modifiers.findIndex(
      (modifier) => modifier.id === modifierId,
    );
    this._modifiers.splice(indexToRemove, 1);
  }

  private _areAllCategoryItemsExistByIdInMenu(itemIds: ItemId[]) {
    return itemIds.some((itemId) =>
      this._isCategoryItemExistsByIdInMenu(itemId),
    );
  }

  private _isCategoryItemExistsByIdInMenu(itemId: ItemId) {
    return this._isItemExistsById(itemId);
  }

  private _isCategoryExistsById(categoryId: CategoryId) {
    return this._categories.some((category) => category.id === categoryId);
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
