import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AppError, DomainError, NotFoundError } from '@resnity/backend-common';

import { Category } from '../domain/entities/category.entity';
import { CreateCategoryPayload } from '../domain/entities/category.entity.types';
import { Item } from '../domain/entities/item.entity';
import { CreateItemPayload } from '../domain/entities/item.entity.types';
import { Modifier } from '../domain/entities/modifier.entity';
import { CreateModifierPayload } from '../domain/entities/modifier.entity.types';
import { Menu } from '../domain/menu.aggregate-root';
import { CreateMenuPayload } from '../domain/menu.aggregate-root.types';
import { Image } from '../domain/value-objects/image.value-object';
import { CreateImagePayload } from '../domain/value-objects/image.value-object.types';
import { Price } from '../domain/value-objects/price.value-object';
import { CreatePricePayload } from '../domain/value-objects/price.value-object.types';
import { ServiceSchedule } from '../domain/value-objects/service-schedule.value-object';
import {
  MENU_REPOSITORY_TOKEN,
  MenuRepository,
} from '../infrastructure/menu.repository';
import {
  AddCategoryServicePayload,
  AddItemServicePayload,
  AddModifierServicePayload,
  CreateMenuServicePayload,
} from './menu.services.types';

export const MENU_SERVICES_TOKEN = Symbol('MENU_SERVICES_TOKEN');

export interface MenuServices {
  getMenus(): Promise<Menu[]>;
  createMenu(payload: CreateMenuServicePayload): Promise<string>;
  addCategory(payload: AddCategoryServicePayload): Promise<string>;
  addItem(payload: AddItemServicePayload): Promise<string>;
  addModifier(payload: AddModifierServicePayload): Promise<string>;
}

export class MenuServicesImpl implements MenuServices {
  constructor(
    private readonly _eventEmitter: EventEmitter2,
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly _repository: MenuRepository,
  ) {}

  async getMenus() {
    return this._repository.findMany();
  }

  async createMenu(payload: CreateMenuServicePayload) {
    const menu = await this._createMenu({
      restaurantId: payload.restaurantId,
      name: payload.name,
      categories: [],
      items: [],
      modifiers: [],
    });

    await this._repository.withTransaction(async () => {
      await this._repository.create(menu);
      await menu.publishEvents(this._eventEmitter);
    });

    return menu.id;
  }

  async addCategory(payload: AddCategoryServicePayload) {
    const menu = await this._getMenuById(payload.menuId);
    const serviceSchedule = await this._createServiceScheduleWithDefaultValue();
    const category = await this._createCategory({
      name: payload.name,
      itemIds: payload.itemIds,
      serviceSchedule,
    });

    this._addCategory(menu, category);

    await this._repository.withTransaction(async () => {
      await this._repository.update(menu);
      await menu.publishEvents(this._eventEmitter);
    });

    return category.id;
  }

  async addItem(payload: AddItemServicePayload) {
    const menu = await this._getMenuById(payload.menuId);
    const price = await this._createPrice({
      amount: payload.priceAmount,
      currency: payload.priceCurrency,
    });
    const images = await Promise.all(
      payload.imageUrls.map((imageUrl) => this._createImage({ url: imageUrl })),
    );

    const item = await this._createItem({
      modifierIds: payload.modifierIds,
      name: payload.name,
      price,
      images,
    });

    this._addItem(menu, item);

    await this._repository.withTransaction(async () => {
      await this._repository.update(menu);
      await menu.publishEvents(this._eventEmitter);
    });

    return item.id;
  }

  async addModifier(payload: AddModifierServicePayload) {
    const menu = await this._getMenuById(payload.menuId);
    const price = await this._createPrice({
      amount: payload.priceAmount,
      currency: payload.priceCurrency,
    });
    const modifier = await this._createModifier({
      itemId: payload.itemId,
      name: payload.name,
      minSelection: payload.minSelection,
      maxSelection: payload.maxSelection,
      isRepeatable: payload.isRepeatable,
      price,
    });

    this._addModifier(menu, modifier);

    await this._repository.withTransaction(async () => {
      await this._repository.update(menu);
      await menu.publishEvents(this._eventEmitter);
    });

    return modifier.id;
  }

  private async _getMenuById(id: string) {
    const result = await this._repository.findById(id);
    if (result === null) throw new NotFoundError();
    return result;
  }

  private _createMenu(payload: CreateMenuPayload) {
    try {
      return Menu.create(payload);
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createCategory(payload: CreateCategoryPayload) {
    try {
      return Category.create(payload);
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createServiceScheduleWithDefaultValue() {
    try {
      return ServiceSchedule.createWithDefaultValue();
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createItem(payload: CreateItemPayload) {
    try {
      return Item.create(payload);
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createModifier(payload: CreateModifierPayload) {
    try {
      return Modifier.create(payload);
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createPrice(payload: CreatePricePayload) {
    try {
      return Price.create(payload);
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createImage(payload: CreateImagePayload) {
    try {
      return Image.create(payload);
    } catch (err: unknown) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _addCategory(menu: Menu, category: Category) {
    try {
      menu.addCategory(category);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _addItem(menu: Menu, item: Item) {
    try {
      menu.addItem(item);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _addModifier(menu: Menu, modifier: Modifier) {
    try {
      menu.addModifier(modifier);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }
}
