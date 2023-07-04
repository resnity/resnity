import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AppError, DomainError, NotFoundError } from '@resnity/backend-common';

import { Outlet } from '../domain/entity/outlet.entity';
import { CreateOutletPayload } from '../domain/entity/outlet.entity.types';
import { Restaurant } from '../domain/restaurant.aggregate-root';
import { CreateRestaurantPayload } from '../domain/restaurant.aggregate-root.types';
import { Address } from '../domain/value-object/address.value-object';
import { CreateAddressPayload } from '../domain/value-object/address.value-object.types';
import { Contact } from '../domain/value-object/contact.value-object';
import { CreateContactPayload } from '../domain/value-object/contact.value-object.types';
import { ServiceSchedule } from '../domain/value-object/service-schedule.value-object';
import { CreateServiceSchedulePayload } from '../domain/value-object/service-schedule.value-object.types';
import { TimePeriod } from '../domain/value-object/time-period.value-object';
import { CreateTimePeriodPayload } from '../domain/value-object/time-period.value-object.types';
import {
  RESTAURANT_REPOSITORY_TOKEN,
  RestaurantRepository,
} from '../infrastructure/restaurant.repository';
import {
  AddOutletServicePayload,
  CreateRestaurantServicePayload,
  UpdateRestaurantServicePayload,
} from './restaurant.services.types';

export const RESTAURANT_SERVICE_TOKEN = Symbol('RESTAURANT_SERVICE_TOKEN');

export interface RestaurantServices {
  getRestaurants(): Promise<Restaurant[]>;
  createRestaurant(
    payload: CreateRestaurantServicePayload,
  ): Promise<Restaurant>;
  updateRestaurantById(
    id: string,
    payload: UpdateRestaurantServicePayload,
  ): Promise<Restaurant>;
  removeRestaurantById(id: string): Promise<void>;
  addOutlet(id: string, payload: AddOutletServicePayload): Promise<string>;
}

export class RestaurantServiceImpl implements RestaurantServices {
  constructor(
    private readonly _eventEmitter: EventEmitter2,
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly _repository: RestaurantRepository,
  ) {}

  async getRestaurants() {
    return this._repository.findMany();
  }

  async createRestaurant(payload: CreateRestaurantServicePayload) {
    const restaurant = this._createRestaurant({
      menuIds: [],
      name: payload.name,
    });

    await this._repository.withTransaction(async () => {
      await this._repository.create(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });

    return restaurant;
  }

  async updateRestaurantById(
    id: string,
    payload: UpdateRestaurantServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(id);
    restaurant.update(payload);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });

    return restaurant;
  }

  async removeRestaurantById(id: string) {
    const restaurant = await this._getRestaurantById(id);
    await this._repository.remove(restaurant);
  }

  async addOutlet(id: string, payload: AddOutletServicePayload) {
    const restaurant = await this._getRestaurantById(id);

    const address = this._createAddress(payload.address);
    const contact = this._createContact(payload.contact);
    const serviceSchedule = this._createServiceSchedule({
      ...payload.serviceSchedule,
      monday: this._createTimePeriod(payload.serviceSchedule.monday),
      tuesday: this._createTimePeriod(payload.serviceSchedule.tuesday),
      wednesday: this._createTimePeriod(payload.serviceSchedule.wednesday),
      thursday: this._createTimePeriod(payload.serviceSchedule.thursday),
      friday: this._createTimePeriod(payload.serviceSchedule.friday),
      saturday: this._createTimePeriod(payload.serviceSchedule.saturday),
      sunday: this._createTimePeriod(payload.serviceSchedule.sunday),
    });
    const outlet = this._createOutlet({
      ...payload,
      address,
      contact,
      serviceSchedule,
    });

    restaurant.addOutlet(outlet);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });

    return restaurant.id;
  }

  private async _getRestaurantById(id: string) {
    const result = await this._repository.findById(id);
    if (result === null) throw new NotFoundError();
    return result;
  }

  private _createRestaurant(payload: CreateRestaurantPayload) {
    try {
      return Restaurant.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createOutlet(payload: CreateOutletPayload) {
    try {
      return Outlet.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createAddress(payload: CreateAddressPayload) {
    try {
      return Address.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createContact(payload: CreateContactPayload) {
    try {
      return Contact.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createServiceSchedule(payload: CreateServiceSchedulePayload) {
    try {
      return ServiceSchedule.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }

  private _createTimePeriod(payload: CreateTimePeriodPayload) {
    try {
      return TimePeriod.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }
}
