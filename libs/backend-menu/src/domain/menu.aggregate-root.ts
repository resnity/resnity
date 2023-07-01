import { AutoMap } from '@automapper/classes';

import {
  AggregateRoot,
  DomainError,
  createEntityId,
  extractMapValues,
  mapClassInstancesToMapBy,
} from '@resnity/backend-common';

import { Category } from './entities/category.entity';
import { assertCategoryId } from './entities/category.entity.assertions';
import { CategoryId } from './entities/category.entity.types';
import { Item } from './entities/item.entity';
import { assertItemId } from './entities/item.entity.assertions';
import { ItemId } from './entities/item.entity.types';
import { Modifier } from './entities/modifier.entity';
import { assertModifierId } from './entities/modifier.entity.assertions';
import { ModifierId } from './entities/modifier.entity.types';
import {
  assertMenuCategories,
  assertMenuCategory,
  assertMenuId,
  assertMenuItem,
  assertMenuItems,
  assertMenuModifier,
  assertMenuModifiers,
  assertMenuName,
  assertMenuRestaurantId,
} from './menu.aggregate-root.assertions';
import {
  CreateMenuPayload,
  MenuCategory,
  MenuId,
  MenuItem,
  MenuModifier,
  MenuName,
  MenuRestaurantId,
  NewMenuPayload,
} from './menu.aggregate-root.types';
import {
  CategoryAddedDomainEvent,
  CategoryRemovedDomainEvent,
  ItemAddedDomainEvent,
  ItemRemovedDomainEvent,
  MenuCreatedDomainEvent,
  ModifierAddedDomainEvent,
  ModifierRemovedDomainEvent,
} from './menu.domain-events';
import { MenuErrorCode } from './menu.errors';

export class Menu extends AggregateRoot<MenuId> {
  private _restaurantId: MenuRestaurantId;
  private _name: MenuName;
  private _categories: Map<CategoryId, MenuCategory>;
  private _items: Map<ItemId, MenuItem>;
  private _modifiers: Map<ModifierId, MenuModifier>;

  static async create(payload: CreateMenuPayload) {
    const menu = await Menu.new({
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

  static new(payload: NewMenuPayload) {
    assertMenuId(payload.id);
    assertMenuRestaurantId(payload.restaurantId);
    assertMenuName(payload.name);
    assertMenuCategories(payload.categories);
    assertMenuItems(payload.items);
    assertMenuModifiers(payload.modifiers);

    const menu = new Menu();
    menu.id = payload.id;
    menu.createdAt = payload.createdAt;
    menu.updatedAt = payload.updatedAt;
    menu.restaurantId = payload.restaurantId;
    menu.name = payload.name;
    menu.categories = payload.categories;
    menu.items = payload.items;
    menu.modifiers = payload.modifiers;
    return menu;
  }

  addCategory(category: Category) {
    assertMenuCategory(category);

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
    assertMenuItem(item);

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
    assertMenuModifier(modifier);

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
    assertCategoryId(id);

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
    assertItemId(id);

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
    assertModifierId(id);

    this._removeModifierById(id);
    this._addEvent(
      new ModifierRemovedDomainEvent({
        aggregateId: this.id,
        modifierId: id,
      }),
    );
    this._setUpdatedAtToNow();
  }

  private _addCategory(category: MenuCategory) {
    if (!this._isCategoryExistsByName(category.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NAME_ALREADY_EXISTS);
    if (!this._areAllCategoryItemsExistByIdInMenu(category.itemIds))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    this._categories.set(category.id, category);
  }

  private _addItem(item: MenuItem) {
    if (!this._isItemExistsByName(item.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NAME_ALREADY_EXISTS);

    this._items.set(item.id, item);
  }

  private _addModifier(modifier: MenuModifier) {
    if (!this._isModifierExistsByName(modifier.name))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NAME_ALREADY_EXISTS);

    this._modifiers.set(modifier.id, modifier);
  }

  private _removeCategoryById(categoryId: CategoryId) {
    if (!this._isCategoryExistsById(categoryId))
      throw DomainError.ofCode(MenuErrorCode.MENU_CATEGORY_NOT_FOUND);

    this._categories.delete(categoryId);
  }

  private _removeItemById(itemId: ItemId) {
    if (!this._isItemExistsById(itemId))
      throw DomainError.ofCode(MenuErrorCode.MENU_ITEM_NOT_FOUND);

    this._items.delete(itemId);
    extractMapValues(this._categories).forEach((category) =>
      category.removeItemById(itemId),
    );
    extractMapValues(this._modifiers)
      .filter((modifier) => modifier.itemId === itemId)
      .forEach((modifier) => this._removeModifierById(modifier.id));
  }

  private _removeModifierById(modifierId: ModifierId) {
    if (!this._isModifierExistsById(modifierId))
      throw DomainError.ofCode(MenuErrorCode.MENU_MODIFIER_NOT_FOUND);

    this._modifiers.delete(modifierId);
  }

  private _areAllCategoryItemsExistByIdInMenu(itemIds: ItemId[]) {
    return itemIds.some((itemId) =>
      this._isCategoryItemExistsByIdInMenu(itemId),
    );
  }

  private _isCategoryItemExistsByIdInMenu(itemId: ItemId) {
    return this._isItemExistsById(itemId);
  }

  private _getCategoryById(categoryId: CategoryId) {
    return this._categories.get(categoryId);
  }

  private _isCategoryExistsById(categoryId: CategoryId) {
    return this._categories.has(categoryId);
  }

  private _isItemExistsById(itemId: ItemId) {
    return this._items.has(itemId);
  }

  private _isModifierExistsById(modifierId: ModifierId) {
    return this._modifiers.has(modifierId);
  }

  private _isCategoryExistsByName(name: string) {
    return extractMapValues(this._categories).every(
      (category) => category.name !== name,
    );
  }

  private _isItemExistsByName(name: string) {
    return extractMapValues(this._items).every((item) => item.name !== name);
  }

  private _isModifierExistsByName(name: string) {
    return extractMapValues(this._modifiers).every(
      (modifier) => modifier.name !== name,
    );
  }

  @AutoMap(() => String)
  get restaurantId(): MenuRestaurantId {
    return this._restaurantId;
  }
  set restaurantId(value: MenuRestaurantId) {
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
  get categories(): MenuCategory[] {
    return extractMapValues(this._categories);
  }
  set categories(value: MenuCategory[]) {
    this._categories = mapClassInstancesToMapBy(value, 'id');
  }

  @AutoMap(() => [Item])
  get items(): MenuItem[] {
    return extractMapValues(this._items);
  }
  set items(value: MenuItem[]) {
    this._items = mapClassInstancesToMapBy(value, 'id');
  }

  @AutoMap(() => [Modifier])
  get modifiers(): MenuModifier[] {
    return extractMapValues(this._modifiers);
  }
  set modifiers(value: MenuModifier[]) {
    this._modifiers = mapClassInstancesToMapBy(value, 'id');
  }
}
