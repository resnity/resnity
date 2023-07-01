import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import {
  MENU_SERVICES_TOKEN,
  MenuServices,
} from '../application/menu.services';
import { MENU_MAPPER_TOKEN, MenuMapper } from '../infrastructure/menu.mapper';
import { AddCategoryRequestBody, CreateMenuRequestBody } from './menu.dtos';

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
    return this._mapper.toResponseDtos(menus);
  }

  @Post()
  async createMenu(@Body() body: CreateMenuRequestBody) {
    const menuId = await this._services.createMenu(body);
    return { id: menuId };
  }

  @Post(':menuId/categories')
  async addCategory(
    @Param('menuId') menuId: string,
    @Body() body: AddCategoryRequestBody,
  ) {
    const result = await this._services.addCategory({ menuId, ...body });
    return { id: result };
  }
}
