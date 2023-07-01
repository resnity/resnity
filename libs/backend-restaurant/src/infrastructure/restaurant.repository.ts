import { Repository, RepositoryImpl } from '@resnity/backend-common';

import { Restaurant } from '../domain/restaurant.aggregate-root';
import { RestaurantModel } from './restaurant.models';

export const RESTAURANT_REPOSITORY_TOKEN = Symbol(
  'RESTAURANT_REPOSITORY_TOKEN',
);

export interface RestaurantRepository
  extends Repository<Restaurant, RestaurantModel> {}

export class RestaurantRepositoryImpl
  extends RepositoryImpl<Restaurant, RestaurantModel>
  implements RestaurantRepository {}
