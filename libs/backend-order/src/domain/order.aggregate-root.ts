import { AutoMap } from '@automapper/classes';

import { AggregateRoot } from '@resnity/backend-common';

import { LineItem } from './entities/line-item.entity';
import { Transaction } from './entities/transaction.entity';
import {
  OrderCode,
  OrderId,
  OrderLineItem,
  OrderOutletId,
  OrderRestaurantId,
  OrderServiceType,
  OrderStatus,
  OrderTableId,
  OrderTransaction,
} from './order.aggregate-root.types';
import { Customer } from './value-objects/customer.value-object';

export class Order extends AggregateRoot<OrderId> {
  private _restaurantId: OrderRestaurantId;
  private _outletId: OrderOutletId;
  private _tableId?: OrderTableId;
  private _code: OrderCode;
  private _status: OrderStatus;
  private _serviceType: OrderServiceType;
  private _customer: Customer;
  private _lineItems: OrderLineItem[];
  private _transactions: OrderTransaction[];

  @AutoMap(() => String)
  get restaurantId(): OrderRestaurantId {
    return this._restaurantId;
  }
  set restaurantId(value: OrderRestaurantId) {
    this._restaurantId = value;
  }

  @AutoMap(() => String)
  get outletId(): OrderOutletId {
    return this._outletId;
  }
  set outletId(value: OrderOutletId) {
    this._outletId = value;
  }

  @AutoMap(() => String)
  get tableId(): OrderTableId | undefined {
    return this._tableId;
  }
  set tableId(value: OrderTableId | undefined) {
    this._tableId = value;
  }

  @AutoMap(() => String)
  get code(): OrderCode {
    return this._code;
  }
  set code(value: OrderCode) {
    this._code = value;
  }

  @AutoMap(() => String)
  get status(): OrderStatus {
    return this._status;
  }
  set status(value: OrderStatus) {
    this._status = value;
  }

  @AutoMap(() => String)
  get serviceType(): OrderServiceType {
    return this._serviceType;
  }
  set serviceType(value: OrderServiceType) {
    this._serviceType = value;
  }

  @AutoMap(() => Customer)
  get customer(): Customer {
    return this._customer;
  }
  set customer(value: Customer) {
    this._customer = value;
  }

  @AutoMap(() => [LineItem])
  get lineItems(): OrderLineItem[] {
    return this._lineItems;
  }
  set lineItems(value: OrderLineItem[]) {
    this._lineItems = value;
  }

  @AutoMap(() => [Transaction])
  get transactions(): OrderTransaction[] {
    return this._transactions;
  }
  set transactions(value: OrderTransaction[]) {
    this._transactions = value;
  }
}
