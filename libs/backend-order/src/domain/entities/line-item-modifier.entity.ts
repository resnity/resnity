import { AutoMap } from '@automapper/classes';

import { Entity } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import {
  LineItemModifierId,
  LineItemModifierMenuId,
  LineItemModifierMenuModifierId,
  LineItemModifierName,
  LineItemModifierPrice,
  LineItemModifierQuantity,
} from './line-item-modifier.entity.types';

export class LineItemModifier extends Entity<LineItemModifierId> {
  private _menuId: LineItemModifierMenuId;
  private _menuModifierId: LineItemModifierMenuModifierId;
  private _name: LineItemModifierName;
  private _price: LineItemModifierPrice;
  private _quantity: LineItemModifierQuantity;

  @AutoMap(() => String)
  get menuId(): LineItemModifierMenuId {
    return this._menuId;
  }
  set menuId(value: LineItemModifierMenuId) {
    this._menuId = value;
  }

  @AutoMap(() => String)
  get menuModifierId(): LineItemModifierMenuModifierId {
    return this._menuModifierId;
  }
  set menuModifierId(value: LineItemModifierMenuModifierId) {
    this._menuModifierId = value;
  }

  @AutoMap(() => String)
  get name(): LineItemModifierName {
    return this._name;
  }
  set name(value: LineItemModifierName) {
    this._name = value;
  }

  @AutoMap(() => Price)
  get price(): LineItemModifierPrice {
    return this._price;
  }
  set price(value: LineItemModifierPrice) {
    this._price = value;
  }

  @AutoMap(() => Number)
  get quantity(): LineItemModifierQuantity {
    return this._quantity;
  }
  set quantity(value: LineItemModifierQuantity) {
    this._quantity = value;
  }
}
