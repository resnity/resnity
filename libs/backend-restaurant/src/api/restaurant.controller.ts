import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Auth, Permission } from '@resnity/backend-auth';
import { HttpResponse } from '@resnity/backend-common';

import {
  RESTAURANT_SERVICE_TOKEN,
  RestaurantServices,
} from '../application/restaurant.services';
import {
  RESTAURANT_MAPPER_TOKEN,
  RestaurantMapper,
} from '../infrastructure/restaurant.mapper';
import {
  CreateRestaurantRequestBody,
  UpdateRestaurantRequestBody,
} from './restaurant.dtos';

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
    const dtos = this._mapper.toResponseDtos(restaurants);
    return HttpResponse.ok(dtos);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post()
  async createRestaurant(@Body() body: CreateRestaurantRequestBody) {
    const restaurant = await this._services.createRestaurant(body);
    const dto = this._mapper.toResponseDto(restaurant);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':id')
  async updateRestaurantById(
    @Param('id') id: string,
    @Body() body: UpdateRestaurantRequestBody,
  ) {
    const restaurant = await this._services.updateRestaurantById(id, body);
    const dto = this._mapper.toResponseDto(restaurant);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post(':id')
  async removeRestaurantById(@Param('id') id: string) {
    await this._services.removeRestaurantById(id);
    return HttpResponse.ok();
  }
}
