import {
  Body,
  Controller,
  Delete,
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
  CreateOutletRequestBody,
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
  @Patch(':restaurantId')
  async updateRestaurantById(
    @Param('restaurantId') restaurantId: string,
    @Body() body: UpdateRestaurantRequestBody,
  ) {
    const restaurant = await this._services.updateRestaurantById(
      restaurantId,
      body,
    );
    const dto = this._mapper.toResponseDto(restaurant);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId')
  async removeRestaurantById(@Param('restaurantId') restaurantId: string) {
    await this._services.removeRestaurantById(restaurantId);
    return HttpResponse.ok();
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post(':restaurantId/outlets')
  async createOutlet(
    @Param('restaurantId') restaurantId: string,
    @Body() body: CreateOutletRequestBody,
  ) {
    const restaurant = await this._services.createOutlet(restaurantId, body);
    const dto = this._mapper.toResponseDto(restaurant);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId/outlets/:outletId')
  async updateOutletById(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
    @Body() body: UpdateRestaurantRequestBody,
  ) {
    const restaurant = await this._services.updateOutletById(
      restaurantId,
      outletId,
      body,
    );
    const dto = this._mapper.toResponseDto(restaurant);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId/outlets/:outletId')
  async removeOutletById(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
  ) {
    await this._services.removeOutletById(restaurantId, outletId);
    return HttpResponse.ok();
  }
}
