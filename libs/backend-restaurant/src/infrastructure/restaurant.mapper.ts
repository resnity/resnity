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
  AddressResponseDto,
  ContactResponseDto,
  OutletResponseDto,
  RestaurantResponseDto,
  ServiceScheduleResponseDto,
  TableResponseDto,
  TimePeriodResponseDto,
} from '../api/restaurant.dtos';
import { Outlet } from '../domain/entity/outlet.entity';
import { Table } from '../domain/entity/table.entity';
import { Restaurant } from '../domain/restaurant.aggregate-root';
import { Address } from '../domain/value-object/address.value-object';
import { Contact } from '../domain/value-object/contact.value-object';
import { ServiceSchedule } from '../domain/value-object/service-schedule.value-object';
import { TimePeriod } from '../domain/value-object/time-period.value-object';
import {
  AddressModel,
  ContactModel,
  OutletModel,
  RestaurantModel,
  ServiceScheduleModel,
  TableModel,
  TimePeriodModel,
} from './restaurant.models';

export const restaurantMappingProfile: MappingProfile = (mapper) => {
  createMap(mapper, Address, AddressResponseDto);
  createMap(mapper, Contact, ContactResponseDto);
  createMap(mapper, TimePeriod, TimePeriodResponseDto);
  createMap(mapper, ServiceSchedule, ServiceScheduleResponseDto);
  createMap(
    mapper,
    Table,
    TableResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );
  createMap(
    mapper,
    Outlet,
    OutletResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );
  createMap(
    mapper,
    Restaurant,
    RestaurantResponseDto,
    extendBaseEntityToResponseDtoMap(mapper),
  );

  createMap(mapper, Address, AddressModel);
  createMap(mapper, Contact, ContactModel);
  createMap(mapper, TimePeriod, TimePeriodModel);
  createMap(mapper, ServiceSchedule, ServiceScheduleModel);
  createMap(mapper, Table, TableModel, extendBaseEntityToModelMap(mapper));
  createMap(mapper, Outlet, OutletModel, extendBaseEntityToModelMap(mapper));
  createMap(
    mapper,
    Restaurant,
    RestaurantModel,
    extendBaseEntityToModelMap(mapper),
  );

  createMap(mapper, AddressModel, Address);
  createMap(mapper, ContactModel, Contact);
  createMap(mapper, TimePeriodModel, TimePeriod);
  createMap(mapper, ServiceScheduleModel, ServiceSchedule);
  createMap(mapper, TableModel, Table, extendBaseModelToEntityMap(mapper));
  createMap(mapper, OutletModel, Outlet, extendBaseModelToEntityMap(mapper));
  createMap(
    mapper,
    RestaurantModel,
    Restaurant,
    extendBaseModelToEntityMap(mapper),
  );
};

export const RESTAURANT_MAPPER_TOKEN = Symbol('RESTAURANT_MAPPER_TOKEN');

export interface RestaurantMapper
  extends EntityMapper<Restaurant, RestaurantResponseDto, RestaurantModel> {}

export class RestaurantMapperImpl implements RestaurantMapper {
  constructor(@Inject(MAPPER_TOKEN) private readonly _mapper: Mapper) {}

  toResponseDto(entity: Restaurant): RestaurantResponseDto {
    return this._mapper.map(entity, Restaurant, RestaurantResponseDto);
  }

  toResponseDtos(entities: Restaurant[]): RestaurantResponseDto[] {
    return this._mapper.mapArray(entities, Restaurant, RestaurantResponseDto);
  }

  toPersistenceModel(entity: Restaurant): RestaurantModel {
    return this._mapper.map(entity, Restaurant, RestaurantModel);
  }

  toPersistenceModels(entities: Restaurant[]): RestaurantModel[] {
    return this._mapper.mapArray(entities, Restaurant, RestaurantModel);
  }

  fromPersistenceModel(model: RestaurantModel): Restaurant {
    return this._mapper.map(model, RestaurantModel, Restaurant);
  }

  fromPersistenceModels(models: RestaurantModel[]): Restaurant[] {
    return this._mapper.mapArray(models, RestaurantModel, Restaurant);
  }
}
