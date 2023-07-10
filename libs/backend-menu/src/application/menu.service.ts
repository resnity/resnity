import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isNil } from 'lodash';

import {
  NotFoundError,
  withTransformUnknownErrorToAppError,
} from '@resnity/backend-common';

import { Menu } from '../domain/menu.aggregate-root';
import {
  MENU_REPOSITORY_TOKEN,
  MenuRepository,
} from '../infrastructure/menu.repository';
import {
  CreateCategoryServicePayload,
  CreateItemServicePayload,
  CreateMenuServicePayload,
  CreateModifierServicePayload,
  UpdateCategoryServicePayload,
  UpdateItemServicePayload,
  UpdateMenuServicePayload,
  UpdateModifierServicePayload,
} from './menu.service.types';

export const MENU_SERVICES_TOKEN = Symbol('MENU_SERVICES_TOKEN');

export interface MenuService {
  getMenus(): Promise<Menu[]>;
  createMenu(payload: CreateMenuServicePayload): Promise<string>;
  updateMenuById(
    menuId: string,
    payload: UpdateMenuServicePayload,
  ): Promise<void>;
  removeMenuById(menuId: string): Promise<void>;

  createCategory(
    menuId: string,
    payload: CreateCategoryServicePayload,
  ): Promise<string>;
  updateCategoryById(
    menuId: string,
    categoryId: string,
    payload: UpdateCategoryServicePayload,
  ): Promise<void>;
  removeCategoryById(menuId: string, categoryId: string): Promise<void>;

  createItem(
    menuId: string,
    payload: CreateItemServicePayload,
  ): Promise<string>;
  updateItemById(
    menuId: string,
    itemId: string,
    payload: UpdateItemServicePayload,
  ): Promise<void>;
  removeItemById(menuId: string, itemId: string): Promise<void>;

  createModifier(
    menuId: string,
    payload: CreateModifierServicePayload,
  ): Promise<string>;
  updateModifierById(
    menuId: string,
    modifierId: string,
    payload: UpdateModifierServicePayload,
  ): Promise<void>;
  removeModifierById(menuId: string, modifierId: string): Promise<void>;
}

export class MenuServiceImpl implements MenuService {
  constructor(
    private readonly _eventEmitter: EventEmitter2,
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly _repository: MenuRepository,
  ) {}

  async getMenus() {
    return this._repository.findMany();
  }

  async createMenu(payload: CreateMenuServicePayload) {
    const menu = withTransformUnknownErrorToAppError(() =>
      Menu.create({
        restaurantId: payload.restaurantId,
        name: payload.name,
        categories: [],
        items: [],
        modifiers: [],
      }),
    );

    await this._repository.withTransaction(async () => {
      await this._repository.create(menu);
      await menu.publishEvents(this._eventEmitter);
    });

    return menu.id;
  }

  async updateMenuById(menuId: string, payload: UpdateMenuServicePayload) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() => menu.update(payload));

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });
  }

  async removeMenuById(menuId: string) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() => menu.remove());

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.remove(menu);
    });
  }

  async createCategory(menuId: string, payload: CreateCategoryServicePayload) {
    const menu = await this._getMenuById(menuId);
    const categoryId = withTransformUnknownErrorToAppError(() =>
      menu.addCategory(payload),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });

    return categoryId;
  }

  async updateCategoryById(
    menuId: string,
    categoryId: string,
    payload: UpdateCategoryServicePayload,
  ) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() =>
      menu.updateCategoryById(categoryId, payload),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });
  }

  async removeCategoryById(menuId: string, categoryId: string) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() =>
      menu.removeCategoryById(categoryId),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.remove(menu);
    });
  }

  async createItem(menuId: string, payload: CreateItemServicePayload) {
    const menu = await this._getMenuById(menuId);
    const itemId = withTransformUnknownErrorToAppError(() =>
      menu.addItem(payload),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });

    return itemId;
  }

  async updateItemById(
    menuId: string,
    itemId: string,
    payload: UpdateItemServicePayload,
  ) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() =>
      menu.updateItemById(itemId, payload),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });
  }

  async removeItemById(menuId: string, itemId: string) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() => menu.removeItemById(itemId));

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.remove(menu);
    });
  }

  async createModifier(menuId: string, payload: CreateModifierServicePayload) {
    const menu = await this._getMenuById(menuId);
    const modifierId = withTransformUnknownErrorToAppError(() =>
      menu.addModifier(payload),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });

    return modifierId;
  }

  async updateModifierById(
    menuId: string,
    modifierId: string,
    payload: UpdateModifierServicePayload,
  ) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() =>
      menu.updateModifierById(modifierId, payload),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.update(menu);
    });
  }

  async removeModifierById(menuId: string, modifierId: string) {
    const menu = await this._getMenuById(menuId);
    withTransformUnknownErrorToAppError(() =>
      menu.removeModifierById(modifierId),
    );

    await this._repository.withTransaction(async () => {
      await menu.publishEvents(this._eventEmitter);
      await this._repository.remove(menu);
    });
  }

  private async _getMenuById(id: string) {
    const result = await this._repository.findById(id);
    if (isNil(result)) throw new NotFoundError();
    return result;
  }
}
