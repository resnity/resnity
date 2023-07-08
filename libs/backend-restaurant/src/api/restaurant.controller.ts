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
  CreateTableRequestBody,
  UpdateOutletRequestBody,
  UpdateRestaurantRequestBody,
  UpdateTableRequestBody,
} from './restaurant.dtos';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    @Inject(RESTAURANT_SERVICE_TOKEN)
    private readonly _services: RestaurantServices,
    @Inject(RESTAURANT_MAPPER_TOKEN)
    private readonly _mapper: RestaurantMapper,
  ) {}

  @Auth({ requiredPermissions: [Permission.READ_RESTAURANT] })
  @Get()
  async getRestaurants() {
    const restaurants = await this._services.getRestaurants();
    const dtos = this._mapper.toResponseDtos(restaurants);
    return HttpResponse.ok(dtos);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post()
  async createRestaurant(@Body() body: CreateRestaurantRequestBody) {
    const restaurantId = await this._services.createRestaurant(body);
    return HttpResponse.ok({ id: restaurantId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId')
  async updateRestaurantById(
    @Param('restaurantId') restaurantId: string,
    @Body() body: UpdateRestaurantRequestBody,
  ) {
    await this._services.updateRestaurantById(restaurantId, body);
    return HttpResponse.ok({ id: restaurantId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId')
  async removeRestaurantById(@Param('restaurantId') restaurantId: string) {
    await this._services.removeRestaurantById(restaurantId);
    return HttpResponse.ok({ id: restaurantId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post(':restaurantId/outlets')
  async createOutlet(
    @Param('restaurantId') restaurantId: string,
    @Body() body: CreateOutletRequestBody,
  ) {
    const outletId = await this._services.createOutlet(restaurantId, body);
    return HttpResponse.ok({ id: outletId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId/outlets/:outletId')
  async updateOutletById(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
    @Body() body: UpdateOutletRequestBody,
  ) {
    await this._services.updateOutletById(restaurantId, outletId, body);
    return HttpResponse.ok({ id: outletId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId/outlets/:outletId')
  async removeOutletById(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
  ) {
    await this._services.removeOutletById(restaurantId, outletId);
    return HttpResponse.ok({ id: outletId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post(':restaurantId/outlets/:outletId/tables')
  async createTable(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
    @Body() body: CreateTableRequestBody,
  ) {
    const tableId = await this._services.createTable(
      restaurantId,
      outletId,
      body,
    );
    return HttpResponse.ok({ id: tableId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId/outlets/:outletId/tables/:tableId')
  async updateTableById(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
    @Param('tableId') tableId: string,
    @Body() body: UpdateTableRequestBody,
  ) {
    await this._services.updateTableById(restaurantId, outletId, tableId, body);
    return HttpResponse.ok({ id: tableId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId/outlets/:outletId/tables/:tableId')
  async removeTableById(
    @Param('restaurantId') restaurantId: string,
    @Param('outletId') outletId: string,
    @Param('tableId') tableId: string,
  ) {
    await this._services.removeTableById(restaurantId, outletId, tableId);
    return HttpResponse.ok({ id: tableId });
  }
}
