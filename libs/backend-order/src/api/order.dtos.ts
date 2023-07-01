import { AutoMap } from '@automapper/classes';

import { EmbeddedResponseDto, ResponseDto } from '@resnity/backend-common';

import { LineItemStatus } from '../domain/entities/line-item.entity.types';
import { RawTransactionStatus } from '../domain/entities/transaction.entity.types';
import {
  OrderStatus,
  RawOrderServiceType,
} from '../domain/order.aggregate-root.types';
import { RawPriceCurrency } from '../domain/value-objects/price.value-object.types';

export class ContactResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly phoneNumber: string;
  @AutoMap()
  readonly email?: string;
}

export class PriceResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly amount: number;
  @AutoMap(() => String)
  readonly currency: RawPriceCurrency;
}

export class CustomerResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly userId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => ContactResponseDto)
  readonly contact: ContactResponseDto;
}

export class LineItemModifierResponseDto extends ResponseDto {
  @AutoMap()
  readonly menuId: string;
  @AutoMap()
  readonly menuModifierId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => PriceResponseDto)
  readonly price: PriceResponseDto;
  @AutoMap()
  readonly quantity: number;
}

export class LineItemResponseDto extends ResponseDto {
  @AutoMap()
  readonly menuId: string;
  @AutoMap()
  readonly menuItemId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap()
  readonly note?: string;
  @AutoMap(() => PriceResponseDto)
  readonly price: PriceResponseDto;
  @AutoMap()
  readonly quantity: number;
  @AutoMap()
  readonly status: LineItemStatus;
  @AutoMap(() => [LineItemModifierResponseDto])
  readonly modifiers: LineItemModifierResponseDto[];
}

export class TransactionResponseDto extends ResponseDto {
  @AutoMap()
  readonly status: RawTransactionStatus;
  @AutoMap()
  readonly payerUserId: string;
  @AutoMap(() => PriceResponseDto)
  readonly price: PriceResponseDto;
}

export class OrderResponseDto extends ResponseDto {
  @AutoMap()
  readonly restaurantId: string;
  @AutoMap()
  readonly outletId: string;
  @AutoMap()
  readonly tableId?: string;
  @AutoMap()
  readonly code: string;
  @AutoMap()
  readonly status: OrderStatus;
  @AutoMap()
  readonly serviceType: RawOrderServiceType;
  @AutoMap(() => CustomerResponseDto)
  readonly customer: CustomerResponseDto;
  @AutoMap(() => [LineItemResponseDto])
  readonly lineItems: LineItemResponseDto[];
  @AutoMap(() => [TransactionResponseDto])
  readonly transactions: TransactionResponseDto[];
}
