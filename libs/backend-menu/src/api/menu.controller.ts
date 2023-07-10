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
import {
  APP_CLS_TENANT_ID,
  AppClsService,
  HttpResponse,
  UnauthorizedError,
} from '@resnity/backend-common';
import { isNil } from '@resnity/web-common';

import { MENU_SERVICES_TOKEN, MenuService } from '../application/menu.service';
import { MENU_MAPPER_TOKEN, MenuMapper } from '../infrastructure/menu.mapper';
import {
  CreateCategoryRequestBody,
  CreateItemRequestBody,
  CreateMenuRequestBody,
  CreateModifierRequestBody,
  UpdateCategoryRequestBody,
  UpdateItemRequestBody,
  UpdateMenuRequestBody,
  UpdateModifierRequestBody,
} from './menu.dtos';

@Controller('menus')
export class MenuController {
  constructor(
    private readonly _appClsService: AppClsService,
    @Inject(MENU_SERVICES_TOKEN)
    private readonly _menuService: MenuService,
    @Inject(MENU_MAPPER_TOKEN)
    private readonly _mapper: MenuMapper,
  ) {}

  @Auth({ requiredPermissions: [Permission.READ_RESTAURANT_MENUS] })
  @Get()
  async getMenus() {
    const menus = await this._menuService.getMenus();
    const dtos = this._mapper.toResponseDtos(menus);
    return HttpResponse.ok(dtos);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Post()
  async createMenu(@Body() body: CreateMenuRequestBody) {
    const restaurantId = this._getCurrentRestaurantId();
    const menuId = await this._menuService.createMenu({
      restaurantId,
      ...body,
    });
    return HttpResponse.ok({ id: menuId });
  }

  @Auth({ requiredPermissions: [Permission.READ_RESTAURANT_MENUS] })
  @Get(':menuId')
  async getMenuById(@Param('menuId') menuId: string) {
    const menu = await this._menuService.getMenuById(menuId);
    const dto = this._mapper.toResponseDto(menu);
    return HttpResponse.ok(dto);
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Patch(':menuId')
  async updateMenuById(
    @Param('menuId') menuId: string,
    @Body() body: UpdateMenuRequestBody,
  ) {
    await this._menuService.updateMenuById(menuId, body);
    return HttpResponse.ok({ id: menuId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Delete(':menuId')
  async removeMenuById(@Param('menuId') menuId: string) {
    await this._menuService.removeMenuById(menuId);
    return HttpResponse.ok({ id: menuId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Post(':menuId/categories')
  async createCategory(
    @Param('menuId') menuId: string,
    @Body() body: CreateCategoryRequestBody,
  ) {
    const categoryId = await this._menuService.createCategory(menuId, body);
    return HttpResponse.ok({ id: categoryId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Patch(':menuId/categories/:categoryId')
  async updateCategoryById(
    @Param('menuId') menuId: string,
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryRequestBody,
  ) {
    await this._menuService.updateCategoryById(menuId, categoryId, body);
    return HttpResponse.ok({ id: categoryId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Delete(':menuId/categories/:categoryId')
  async removeCategoryById(
    @Param('menuId') menuId: string,
    @Param('categoryId') categoryId: string,
  ) {
    await this._menuService.removeCategoryById(menuId, categoryId);
    return HttpResponse.ok({ id: categoryId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Post(':menuId/items')
  async createItem(
    @Param('menuId') menuId: string,
    @Body() body: CreateItemRequestBody,
  ) {
    const itemId = await this._menuService.createItem(menuId, body);
    return HttpResponse.ok({ id: itemId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Patch(':menuId/items/:itemId')
  async updateItemById(
    @Param('menuId') menuId: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateItemRequestBody,
  ) {
    await this._menuService.updateItemById(menuId, itemId, body);
    return HttpResponse.ok({ id: itemId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Delete(':menuId/items/:itemId')
  async removeItemById(
    @Param('menuId') menuId: string,
    @Param('itemId') itemId: string,
  ) {
    await this._menuService.removeItemById(menuId, itemId);
    return HttpResponse.ok({ id: itemId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Post(':menuId/modifiers')
  async createModifier(
    @Param('menuId') menuId: string,
    @Body() body: CreateModifierRequestBody,
  ) {
    const modifierId = await this._menuService.createModifier(menuId, body);
    return HttpResponse.ok({ id: modifierId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Patch(':menuId/modifiers/:modifierId')
  async updateModifierById(
    @Param('menuId') menuId: string,
    @Param('modifierId') modifierId: string,
    @Body() body: UpdateModifierRequestBody,
  ) {
    await this._menuService.updateModifierById(menuId, modifierId, body);
    return HttpResponse.ok({ id: modifierId });
  }

  @Auth({ requiredPermissions: [Permission.WRITE_RESTAURANT_MENUS] })
  @Delete(':menuId/modifiers/:modifierId')
  async removeModifierById(
    @Param('menuId') menuId: string,
    @Param('modifierId') modifierId: string,
  ) {
    await this._menuService.removeModifierById(menuId, modifierId);
    return HttpResponse.ok({ id: modifierId });
  }

  private _getCurrentRestaurantId() {
    const restaurantId = this._appClsService.get(APP_CLS_TENANT_ID);
    if (isNil(restaurantId)) throw new UnauthorizedError();
    return restaurantId;
  }
}
