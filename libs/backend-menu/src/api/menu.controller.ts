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

import { HttpResponse } from '@resnity/backend-common';

import {
  MENU_SERVICES_TOKEN,
  MenuServices,
} from '../application/menu.services';
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
    @Inject(MENU_SERVICES_TOKEN)
    private readonly _services: MenuServices,
    @Inject(MENU_MAPPER_TOKEN)
    private readonly _mapper: MenuMapper,
  ) {}

  @Get()
  async getMenus() {
    const menus = await this._services.getMenus();
    const dtos = this._mapper.toResponseDtos(menus);
    return HttpResponse.ok(dtos);
  }

  @Post()
  async createMenu(@Body() body: CreateMenuRequestBody) {
    const menuId = await this._services.createMenu(body);
    return HttpResponse.ok({ id: menuId });
  }

  @Patch(':menuId')
  async updateMenuById(
    @Param('menuId') menuId: string,
    @Body() body: UpdateMenuRequestBody,
  ) {
    await this._services.updateMenuById(menuId, body);
    return HttpResponse.ok({ id: menuId });
  }

  @Delete(':menuId')
  async removeMenuById(@Param('menuId') menuId: string) {
    await this._services.removeMenuById(menuId);
    return HttpResponse.ok({ id: menuId });
  }

  @Post(':menuId/categories')
  async createCategory(
    @Param('menuId') menuId: string,
    @Body() body: CreateCategoryRequestBody,
  ) {
    const categoryId = await this._services.createCategory(menuId, body);
    return HttpResponse.ok({ id: categoryId });
  }

  @Patch(':menuId/categories/:categoryId')
  async updateCategoryById(
    @Param('menuId') menuId: string,
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryRequestBody,
  ) {
    await this._services.updateCategoryById(menuId, categoryId, body);
    return HttpResponse.ok({ id: categoryId });
  }

  @Delete(':menuId/categories/:categoryId')
  async removeCategoryById(
    @Param('menuId') menuId: string,
    @Param('categoryId') categoryId: string,
  ) {
    await this._services.removeCategoryById(menuId, categoryId);
    return HttpResponse.ok({ id: categoryId });
  }

  @Post(':menuId/items')
  async createItem(
    @Param('menuId') menuId: string,
    @Body() body: CreateItemRequestBody,
  ) {
    const itemId = await this._services.createItem(menuId, body);
    return HttpResponse.ok({ id: itemId });
  }

  @Patch(':menuId/items/:itemId')
  async updateItemById(
    @Param('menuId') menuId: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateItemRequestBody,
  ) {
    await this._services.updateItemById(menuId, itemId, body);
    return HttpResponse.ok({ id: itemId });
  }

  @Delete(':menuId/items/:itemId')
  async removeItemById(
    @Param('menuId') menuId: string,
    @Param('itemId') itemId: string,
  ) {
    await this._services.removeItemById(menuId, itemId);
    return HttpResponse.ok({ id: itemId });
  }

  @Post(':menuId/modifiers')
  async createModifier(
    @Param('menuId') menuId: string,
    @Body() body: CreateModifierRequestBody,
  ) {
    const modifierId = await this._services.createModifier(menuId, body);
    return HttpResponse.ok({ id: modifierId });
  }

  @Patch(':menuId/modifiers/:modifierId')
  async updateModifierById(
    @Param('menuId') menuId: string,
    @Param('modifierId') modifierId: string,
    @Body() body: UpdateModifierRequestBody,
  ) {
    await this._services.updateModifierById(menuId, modifierId, body);
    return HttpResponse.ok({ id: modifierId });
  }

  @Delete(':menuId/modifiers/:modifierId')
  async removeModifierById(
    @Param('menuId') menuId: string,
    @Param('modifierId') modifierId: string,
  ) {
    await this._services.removeModifierById(menuId, modifierId);
    return HttpResponse.ok({ id: modifierId });
  }
}
