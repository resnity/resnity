import { AutoMap } from '@automapper/classes';

import { EmbeddedModel, Model } from '@resnity/backend-common';

import { LineItemStatus } from '../domain/entities/line-item.entity.types';
import { RawTransactionStatus } from '../domain/entities/transaction.entity.types';
import {
  OrderStatus,
  RawOrderServiceType,
} from '../domain/order.aggregate-root.types';
import { RawPriceCurrency } from '../domain/value-objects/price.value-object.types';

export class ContactModel extends EmbeddedModel {
  @AutoMap()
  readonly phoneNumber: string;
  @AutoMap()
  readonly email?: string;
}

export class PriceModel extends EmbeddedModel {
  @AutoMap()
  readonly amount: number;
  @AutoMap(() => String)
  readonly currency: RawPriceCurrency;
}

export class CustomerModel extends EmbeddedModel {
  @AutoMap()
  readonly userId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => ContactModel)
  readonly contact: ContactModel;
}

export class LineItemModifierModel extends Model {
  @AutoMap()
  readonly menuId: string;
  @AutoMap()
  readonly menuModifierId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => PriceModel)
  readonly price: PriceModel;
  @AutoMap()
  readonly quantity: number;
}

export class LineItemModel extends Model {
  @AutoMap()
  readonly menuId: string;
  @AutoMap()
  readonly menuItemId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap()
  readonly note?: string;
  @AutoMap(() => PriceModel)
  readonly price: PriceModel;
  @AutoMap()
  readonly quantity: number;
  @AutoMap()
  readonly status: LineItemStatus;
  @AutoMap(() => [LineItemModifierModel])
  readonly modifiers: LineItemModifierModel[];
}

export class TransactionModel extends Model {
  @AutoMap()
  readonly status: RawTransactionStatus;
  @AutoMap()
  readonly payerUserId: string;
  @AutoMap(() => PriceModel)
  readonly price: PriceModel;
}

export class OrderModel extends Model {
  @AutoMap()
  readonly restaurantId: string;
  @AutoMap()
  readonly storeId: string;
  @AutoMap()
  readonly tableId?: string;
  @AutoMap()
  readonly code: string;
  @AutoMap()
  readonly status: OrderStatus;
  @AutoMap()
  readonly serviceType: RawOrderServiceType;
  @AutoMap(() => CustomerModel)
  readonly customer: CustomerModel;
  @AutoMap(() => [LineItemModel])
  readonly lineItems: LineItemModel[];
  @AutoMap(() => [TransactionModel])
  readonly transactions: TransactionModel[];
}
