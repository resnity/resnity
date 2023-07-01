import { Repository, RepositoryImpl } from '@resnity/backend-common';

import { Order } from '../domain/order.aggregate-root';
import { OrderModel } from './order.models';

export const ORDER_REPOSITORY_TOKEN = Symbol('ORDER_REPOSITORY_TOKEN');

export interface OrderRepository extends Repository<Order, OrderModel> {}

export class OrderRepositoryImpl extends RepositoryImpl<Order, OrderModel> {}
