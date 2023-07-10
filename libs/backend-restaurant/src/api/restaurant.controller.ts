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

import {
  Auth,
  ORGANIZATION_SERVICE_TOKEN,
  OrganizationService,
  Permission,
} from '@resnity/backend-auth';
import {
  APP_CLS_TENANT_ID,
  AppClsService,
  HttpResponse,
  UnauthorizedError,
} from '@resnity/backend-common';

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
  CreateStoreRequestBody,
  CreateTableRequestBody,
  UpdateRestaurantRequestBody,
  UpdateStoreRequestBody,
  UpdateTableRequestBody,
} from './restaurant.dtos';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly _appClsService: AppClsService,
    @Inject(ORGANIZATION_SERVICE_TOKEN)
    private readonly _organizationService: OrganizationService,
    @Inject(RESTAURANT_SERVICE_TOKEN)
    private readonly _restaurantService: RestaurantServices,
    @Inject(RESTAURANT_MAPPER_TOKEN)
    private readonly _mapper: RestaurantMapper,
  ) {}

  @Auth({ requiredPermissions: [Permission.READ_RESTAURANT] })
  @Get()
  async getRestaurants() {
    const restaurants = await this._restaurantService.getRestaurants();
    const dtos = this._mapper.toResponseDtos(restaurants);
    return HttpResponse.ok(dtos);
  }

  @Auth({ requiredPermissions: [Permission.READ_RESTAURANT] })
  @Get('current')
  async getCurrentRestaurant() {
    const restaurantId = this._getCurrentUserOrganizationId();
    const restaurant = await this._restaurantService.getRestaurantById(
      restaurantId,
    );
    const dto = this._mapper.toResponseDto(restaurant);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post('setup')
  async setupRestaurant() {
    const organization = await this._getCurrentOrganization();
    await this._restaurantService.setupRestaurant({
      id: organization.id,
      name: organization.name,
      displayName: organization.display_name,
    });
    return HttpResponse.ok({ id: organization.id });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post()
  async createRestaurant(@Body() body: CreateRestaurantRequestBody) {
    const restaurantId = await this._restaurantService.createRestaurant(body);
    return HttpResponse.ok({ id: restaurantId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId')
  async updateRestaurantById(
    @Param('restaurantId') restaurantId: string,
    @Body() body: UpdateRestaurantRequestBody,
  ) {
    await this._restaurantService.updateRestaurantById(restaurantId, body);
    return HttpResponse.ok({ id: restaurantId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId')
  async removeRestaurantById(@Param('restaurantId') restaurantId: string) {
    await this._restaurantService.removeRestaurantById(restaurantId);
    return HttpResponse.ok({ id: restaurantId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post(':restaurantId/stores')
  async createStore(
    @Param('restaurantId') restaurantId: string,
    @Body() body: CreateStoreRequestBody,
  ) {
    const storeId = await this._restaurantService.createStore(
      restaurantId,
      body,
    );
    return HttpResponse.ok({ id: storeId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId/stores/:storeId')
  async updateStoreById(
    @Param('restaurantId') restaurantId: string,
    @Param('storeId') storeId: string,
    @Body() body: UpdateStoreRequestBody,
  ) {
    await this._restaurantService.updateStoreById(restaurantId, storeId, body);
    return HttpResponse.ok({ id: storeId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId/stores/:storeId')
  async removeStoreById(
    @Param('restaurantId') restaurantId: string,
    @Param('storeId') storeId: string,
  ) {
    await this._restaurantService.removeStoreById(restaurantId, storeId);
    return HttpResponse.ok({ id: storeId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Post(':restaurantId/stores/:storeId/tables')
  async createTable(
    @Param('restaurantId') restaurantId: string,
    @Param('storeId') storeId: string,
    @Body() body: CreateTableRequestBody,
  ) {
    const tableId = await this._restaurantService.createTable(
      restaurantId,
      storeId,
      body,
    );
    return HttpResponse.ok({ id: tableId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Patch(':restaurantId/stores/:storeId/tables/:tableId')
  async updateTableById(
    @Param('restaurantId') restaurantId: string,
    @Param('storeId') storeId: string,
    @Param('tableId') tableId: string,
    @Body() body: UpdateTableRequestBody,
  ) {
    await this._restaurantService.updateTableById(
      restaurantId,
      storeId,
      tableId,
      body,
    );
    return HttpResponse.ok({ id: tableId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT] })
  @Delete(':restaurantId/stores/:storeId/tables/:tableId')
  async removeTableById(
    @Param('restaurantId') restaurantId: string,
    @Param('storeId') storeId: string,
    @Param('tableId') tableId: string,
  ) {
    await this._restaurantService.removeTableById(
      restaurantId,
      storeId,
      tableId,
    );
    return HttpResponse.ok({ id: tableId });
  }

  private async _getCurrentOrganization() {
    const organizationId = this._getCurrentUserOrganizationId();
    return await this._organizationService.getOrganizationById(organizationId);
  }

  private _getCurrentUserOrganizationId() {
    const organizationId = this._appClsService.get(APP_CLS_TENANT_ID);
    if (!organizationId) throw new UnauthorizedError();
    return organizationId;
  }
}
