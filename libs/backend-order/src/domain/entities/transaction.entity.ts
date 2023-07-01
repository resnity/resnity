import { AutoMap } from '@automapper/classes';

import { Entity } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import {
  TransactionId,
  TransactionPayerUserId,
  TransactionPrice,
  TransactionStatus,
} from './transaction.entity.types';

export class Transaction extends Entity<TransactionId> {
  private _payerUserId: TransactionPayerUserId;
  private _price: TransactionPrice;
  private _status: TransactionStatus;

  @AutoMap(() => String)
  get payerUserId(): TransactionPayerUserId {
    return this._payerUserId;
  }
  set payerUserId(value: TransactionPayerUserId) {
    this._payerUserId = value;
  }

  @AutoMap(() => Price)
  get price(): TransactionPrice {
    return this._price;
  }
  set price(value: TransactionPrice) {
    this._price = value;
  }

  @AutoMap(() => String)
  get status(): TransactionStatus {
    return this._status;
  }
  set status(value: TransactionStatus) {
    this._status = value;
  }
}
