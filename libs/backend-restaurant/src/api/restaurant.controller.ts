import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import {
  Auth,
  Permission,
  extractUserFromRequest,
} from '@resnity/backend-auth';

import {
  RESTAURANT_SERVICE_TOKEN,
  RestaurantServices,
} from '../application/restaurant.services';
import {
  RESTAURANT_MAPPER_TOKEN,
  RestaurantMapper,
} from '../infrastructure/restaurant.mapper';
import { CreateRestaurantRequestBody } from './restaurant.dtos';


@Controller('restaurants')
export class RestaurantController {
  constructor(
    @Inject(RESTAURANT_SERVICE_TOKEN)
    private readonly _services: RestaurantServices,
    @Inject(RESTAURANT_MAPPER_TOKEN)
    private readonly _mapper: RestaurantMapper,
  ) {}

  @Get()
  async getRestaurants() {
    const restaurants = await this._services.getRestaurants();
    return this._mapper.toResponseDtos(restaurants);
  }

  @Auth({
    requiredPermissions: [Permission.WRITE_RESTAURANT],
  })
  @Post()
  async createRestaurant(
    @Req() request: Request,
    @Body() body: CreateRestaurantRequestBody,
  ) {
    const user = await extractUserFromRequest(request);
    const restaurantId = await this._services.createRestaurant({
      name: body.name,
      userId: user.sub,
    });
    return { id: restaurantId };
  }
}
