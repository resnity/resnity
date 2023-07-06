import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { Inject } from '@nestjs/common';

import {
  EntityMapper,
  MAPPER_TOKEN,
  extendBaseEntityToModelMap,
  extendBaseEntityToResponseDtoMap,
  extendBaseModelToEntityMap,
} from '@resnity/backend-common';

import {
  CategoryResponseDto,
  ItemResponseDto,
  MenuResponseDto,
  ModifierResponseDto,
  ServiceScheduleResponseDto,
  TimePeriodResponseDto,
} from '../api/menu.dtos';
import { Category } from '../domain/entities/category.entity';
import { Item } from '../domain/entities/item.entity';
import { Modifier } from '../domain/entities/modifier.entity';
import { Menu } from '../domain/menu.aggregate-root';
import { ServiceSchedule } from '../domain/value-objects/service-schedule.value-object';
import { TimePeriod } from '../domain/value-objects/time-period.value-object';
import {
  CategoryModel,
  ItemModel,
  MenuModel,
  ModifierModel,
  ServiceScheduleModel,
  TimePeriodModel,
} from './menu.models';

export const menuMappingProfile: MappingProfile = (mapper: Mapper) => {
  createMap(mapper, TimePeriod, TimePeriodResponseDto);
  createMap(mapper, ServiceSchedule, ServiceScheduleResponseDto);
  createMap(
    mapper,
    Category,
    CategoryResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );
  createMap(
    mapper,
    Item,
    ItemResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );
  createMap(
    mapper,
    Modifier,
    ModifierResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );
  createMap(
    mapper,
    Menu,
    MenuResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );

  createMap(mapper, TimePeriod, TimePeriodModel);
  createMap(mapper, ServiceSchedule, ServiceScheduleModel);
  createMap(
    mapper,
    Category,
    CategoryModel,
    extendBaseEntityToModelMap(mapper),
  );
  createMap(mapper, Item, ItemModel, extendBaseEntityToModelMap(mapper));
  createMap(
    mapper,
    Modifier,
    ModifierModel,
    extendBaseEntityToModelMap(mapper),
  );
  createMap(mapper, Menu, MenuModel, extendBaseEntityToModelMap(mapper));

  createMap(mapper, TimePeriodModel, TimePeriod);
  createMap(mapper, ServiceScheduleModel, ServiceSchedule);
  createMap(
    mapper,
    CategoryModel,
    Category,
    extendBaseModelToEntityMap(mapper),
  );
  createMap(mapper, ItemModel, Item, extendBaseModelToEntityMap(mapper));
  createMap(
    mapper,
    ModifierModel,
    Modifier,
    extendBaseModelToEntityMap(mapper),
  );
  createMap(mapper, MenuModel, Menu, extendBaseModelToEntityMap(mapper));
};

export const MENU_MAPPER_TOKEN = Symbol('MENU_MAPPER_TOKEN');

export interface MenuMapper
  extends EntityMapper<Menu, MenuResponseDto, MenuModel> {}

export class MenuMapperImpl implements MenuMapper {
  constructor(@Inject(MAPPER_TOKEN) private readonly mapper: Mapper) {}

  toResponseDto(entity: Menu): MenuResponseDto {
    return this.mapper.map(entity, Menu, MenuResponseDto);
  }

  toResponseDtos(entities: Menu[]): MenuResponseDto[] {
    return this.mapper.mapArray(entities, Menu, MenuResponseDto);
  }

  toPersistenceModel(entity: Menu): MenuModel {
    return this.mapper.map(entity, Menu, MenuModel);
  }

  toPersistenceModels(entities: Menu[]): MenuModel[] {
    return this.mapper.mapArray(entities, Menu, MenuModel);
  }

  fromPersistenceModel(model: MenuModel): Menu {
    return this.mapper.map(model, MenuModel, Menu);
  }

  fromPersistenceModels(models: MenuModel[]): Menu[] {
    return this.mapper.mapArray(models, MenuModel, Menu);
  }
}
