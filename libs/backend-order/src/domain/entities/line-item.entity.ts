import { AutoMap } from '@automapper/classes';

import { Entity } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import { LineItemModifier } from './line-item-modifier.entity';
import {
  LineItemId,
  LineItemMenuId,
  LineItemMenuItemId,
  LineItemName,
  LineItemNote,
  LineItemPrice,
  LineItemQuantity,
  LineItemStatus,
} from './line-item.entity.types';

export class LineItem extends Entity<LineItemId> {
  private _menuId: LineItemMenuId;
  private _menuItemId: LineItemMenuItemId;
  private _name: LineItemName;
  private _note?: LineItemNote;
  private _price: LineItemPrice;
  private _quantity: LineItemQuantity;
  private _status: LineItemStatus;
  private _modifiers: LineItemModifier[];

  @AutoMap(() => String)
  get menuId(): LineItemMenuId {
    return this._menuId;
  }
  set menuId(value: LineItemMenuId) {
    this._menuId = value;
  }

  @AutoMap(() => String)
  get menuItemId(): LineItemMenuItemId {
    return this._menuItemId;
  }
  set menuItemId(value: LineItemMenuItemId) {
    this._menuItemId = value;
  }

  @AutoMap(() => String)
  get name(): LineItemName {
    return this._name;
  }
  set name(value: LineItemName) {
    this._name = value;
  }

  @AutoMap(() => String)
  get note(): LineItemNote | undefined {
    return this._note;
  }
  set note(value: LineItemNote | undefined) {
    this._note = value;
  }

  @AutoMap(() => Price)
  get price(): LineItemPrice {
    return this._price;
  }
  set price(value: LineItemPrice) {
    this._price = value;
  }

  @AutoMap(() => Number)
  get quantity(): LineItemQuantity {
    return this._quantity;
  }
  set quantity(value: LineItemQuantity) {
    this._quantity = value;
  }

  @AutoMap(() => String)
  get status(): LineItemStatus {
    return this._status;
  }
  set status(value: LineItemStatus) {
    this._status = value;
  }

  @AutoMap(() => [LineItemModifier])
  get modifiers(): LineItemModifier[] {
    return this._modifiers;
  }
  set modifiers(value: LineItemModifier[]) {
    this._modifiers = value;
  }
}
