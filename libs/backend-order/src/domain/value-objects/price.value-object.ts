import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import {
  assertPriceAmount,
  assertPriceCurrency,
} from './price.value-object.assertions';
import {
  CreatePricePayload,
  PriceAmount,
  PriceCurrency,
} from './price.value-object.types';

export class Price extends ValueObject {
  private _amount: PriceAmount;
  private _currency: PriceCurrency;

  static create(payload: CreatePricePayload) {
    return Price.new(payload);
  }

  static new(payload: CreatePricePayload) {
    assertPriceAmount(payload.amount);
    assertPriceCurrency(payload.currency);

    const price = new Price();
    price.amount = payload.amount;
    price.currency = payload.currency;
    return price;
  }

  @AutoMap(() => String)
  get amount(): PriceAmount {
    return this._amount;
  }
  set amount(value: PriceAmount) {
    this._amount = value;
  }

  @AutoMap(() => String)
  get currency(): PriceCurrency {
    return this._currency;
  }
  set currency(value: PriceCurrency) {
    this._currency = value;
  }
}
