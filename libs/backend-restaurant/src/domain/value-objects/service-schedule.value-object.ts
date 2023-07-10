import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import {
  CreateServiceSchedulePayload,
  ServiceScheduleName,
  assertServiceScheduleNameValid,
} from './service-schedule.value-object.types';
import { TimePeriod } from './time-period.value-object';

export class ServiceSchedule extends ValueObject {
  private _name: ServiceScheduleName;
  private _monday: TimePeriod;
  private _tuesday: TimePeriod;
  private _wednesday: TimePeriod;
  private _thursday: TimePeriod;
  private _friday: TimePeriod;
  private _saturday: TimePeriod;
  private _sunday: TimePeriod;

  static create(payload: CreateServiceSchedulePayload) {
    return ServiceSchedule.new(payload);
  }

  static createWithDefaultValue() {
    return ServiceSchedule.new({
      name: 'default',
      monday: TimePeriod.createWithDefaultValue(),
      tuesday: TimePeriod.createWithDefaultValue(),
      wednesday: TimePeriod.createWithDefaultValue(),
      thursday: TimePeriod.createWithDefaultValue(),
      friday: TimePeriod.createWithDefaultValue(),
      saturday: TimePeriod.createWithDefaultValue(),
      sunday: TimePeriod.createWithDefaultValue(),
    });
  }

  static new(payload: CreateServiceSchedulePayload) {
    assertServiceScheduleNameValid(payload.name);

    const serviceSchedule = new ServiceSchedule();
    serviceSchedule.name = payload.name;
    serviceSchedule.monday = TimePeriod.create(payload.monday);
    serviceSchedule.tuesday = TimePeriod.create(payload.monday);
    serviceSchedule.wednesday = TimePeriod.create(payload.monday);
    serviceSchedule.thursday = TimePeriod.create(payload.monday);
    serviceSchedule.friday = TimePeriod.create(payload.monday);
    serviceSchedule.saturday = TimePeriod.create(payload.monday);
    serviceSchedule.sunday = TimePeriod.create(payload.monday);
    return serviceSchedule;
  }

  @AutoMap(() => String)
  get name(): ServiceScheduleName {
    return this._name;
  }
  set name(value: ServiceScheduleName) {
    this._name = value;
  }

  @AutoMap(() => TimePeriod)
  get monday(): TimePeriod {
    return this._monday;
  }
  set monday(value: TimePeriod) {
    this._monday = value;
  }

  @AutoMap(() => TimePeriod)
  get tuesday(): TimePeriod {
    return this._tuesday;
  }
  set tuesday(value: TimePeriod) {
    this._tuesday = value;
  }

  @AutoMap(() => TimePeriod)
  get wednesday(): TimePeriod {
    return this._wednesday;
  }
  set wednesday(value: TimePeriod) {
    this._wednesday = value;
  }

  @AutoMap(() => TimePeriod)
  get thursday(): TimePeriod {
    return this._thursday;
  }
  set thursday(value: TimePeriod) {
    this._thursday = value;
  }

  @AutoMap(() => TimePeriod)
  get friday(): TimePeriod {
    return this._friday;
  }
  set friday(value: TimePeriod) {
    this._friday = value;
  }

  @AutoMap(() => TimePeriod)
  get saturday(): TimePeriod {
    return this._saturday;
  }
  set saturday(value: TimePeriod) {
    this._saturday = value;
  }

  @AutoMap(() => TimePeriod)
  get sunday(): TimePeriod {
    return this._sunday;
  }
  set sunday(value: TimePeriod) {
    this._sunday = value;
  }
}
