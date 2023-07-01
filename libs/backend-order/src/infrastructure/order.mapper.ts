import { Mapper, createMap } from '@automapper/core';
import { Inject } from '@nestjs/common';

import {
  DomainEntityMapper,
  MAPPER_TOKEN,
  extendBaseMaps,
} from '@resnity/backend-common';

import {
  ContactResponseDto,
  CustomerResponseDto,
  LineItemModifierResponseDto,
  LineItemResponseDto,
  OrderResponseDto,
  PriceResponseDto,
  TransactionResponseDto,
} from '../api/order.dtos';
import { LineItemModifier } from '../domain/entities/line-item-modifier.entity';
import { LineItem } from '../domain/entities/line-item.entity';
import { Transaction } from '../domain/entities/transaction.entity';
import { Order } from '../domain/order.aggregate-root';
import { Contact } from '../domain/value-objects/contact.value-object';
import { Customer } from '../domain/value-objects/customer.value-object';
import { Price } from '../domain/value-objects/price.value-object';
import {
  ContactModel,
  CustomerModel,
  LineItemModel,
  LineItemModifierModel,
  OrderModel,
  PriceModel,
  TransactionModel,
} from './order.models';

export const orderMappingProfile = (mapper: Mapper) => {
  extendBaseMaps(mapper);

  createMap(mapper, Contact, ContactResponseDto);
  createMap(mapper, Customer, CustomerResponseDto);
  createMap(mapper, Price, PriceResponseDto);
  createMap(mapper, LineItemModifier, LineItemModifierResponseDto);
  createMap(mapper, LineItem, LineItemResponseDto);
  createMap(mapper, Transaction, TransactionResponseDto);
  createMap(mapper, Order, OrderResponseDto);

  createMap(mapper, Contact, ContactModel);
  createMap(mapper, Customer, CustomerModel);
  createMap(mapper, Price, PriceModel);
  createMap(mapper, LineItemModifier, LineItemModifierModel);
  createMap(mapper, LineItem, LineItemModel);
  createMap(mapper, Transaction, TransactionModel);
  createMap(mapper, Order, OrderModel);

  createMap(mapper, ContactModel, Contact);
  createMap(mapper, CustomerModel, Customer);
  createMap(mapper, PriceModel, Price);
  createMap(mapper, LineItemModifierModel, LineItemModifier);
  createMap(mapper, LineItemModel, LineItem);
  createMap(mapper, TransactionModel, Transaction);
  createMap(mapper, OrderModel, Order);
};

export const ORDER_MAPPER_TOKEN = Symbol('ORDER_MAPPER_TOKEN');

export interface OrderMapper
  extends DomainEntityMapper<Order, OrderResponseDto, OrderModel> {}

export class OrderMapperImpl implements OrderMapper {
  constructor(@Inject(MAPPER_TOKEN) private readonly _mapper: Mapper) {}

  toResponseDto(entity: Order): OrderResponseDto {
    return this._mapper.map(entity, Order, OrderResponseDto);
  }

  toResponseDtos(entities: Order[]): OrderResponseDto[] {
    return this._mapper.mapArray(entities, Order, OrderResponseDto);
  }

  toPersistenceModel(entity: Order): OrderModel {
    return this._mapper.map(entity, Order, OrderModel);
  }

  toPersistenceModels(entities: Order[]): OrderModel[] {
    return this._mapper.mapArray(entities, Order, OrderModel);
  }

  fromPersistenceModel(model: OrderModel): Order {
    return this._mapper.map(model, OrderModel, Order);
  }

  fromPersistenceModels(models: OrderModel[]): Order[] {
    return this._mapper.mapArray(models, OrderModel, Order);
  }
}
