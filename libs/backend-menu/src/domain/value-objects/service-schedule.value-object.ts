import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import {
  assertServiceScheduleName,
  assertServiceScheduleTimePeriod,
} from './service-schedule.value-object.assertions';
import {
  CreateServiceSchedulePayload,
  ServiceScheduleName,
  ServiceScheduleTimePeriod,
} from './service-schedule.value-object.types';
import { TimePeriod } from './time-period.value-object';

export class ServiceSchedule extends ValueObject {
  private _name: ServiceScheduleName;
  private _monday: ServiceScheduleTimePeriod;
  private _tuesday: ServiceScheduleTimePeriod;
  private _wednesday: ServiceScheduleTimePeriod;
  private _thursday: ServiceScheduleTimePeriod;
  private _friday: ServiceScheduleTimePeriod;
  private _saturday: ServiceScheduleTimePeriod;
  private _sunday: ServiceScheduleTimePeriod;

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
    assertServiceScheduleName(payload.name);
    assertServiceScheduleTimePeriod(payload.monday);
    assertServiceScheduleTimePeriod(payload.tuesday);
    assertServiceScheduleTimePeriod(payload.wednesday);
    assertServiceScheduleTimePeriod(payload.thursday);
    assertServiceScheduleTimePeriod(payload.friday);
    assertServiceScheduleTimePeriod(payload.saturday);
    assertServiceScheduleTimePeriod(payload.sunday);

    const serviceSchedule = new ServiceSchedule();
    serviceSchedule.name = payload.name;
    serviceSchedule.monday = payload.monday;
    serviceSchedule.tuesday = payload.tuesday;
    serviceSchedule.wednesday = payload.wednesday;
    serviceSchedule.thursday = payload.thursday;
    serviceSchedule.friday = payload.friday;
    serviceSchedule.saturday = payload.saturday;
    serviceSchedule.sunday = payload.sunday;
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
  get monday(): ServiceScheduleTimePeriod {
    return this._monday;
  }
  set monday(value: ServiceScheduleTimePeriod) {
    this._monday = value;
  }

  @AutoMap(() => TimePeriod)
  get tuesday(): ServiceScheduleTimePeriod {
    return this._tuesday;
  }
  set tuesday(value: ServiceScheduleTimePeriod) {
    this._tuesday = value;
  }

  @AutoMap(() => TimePeriod)
  get wednesday(): ServiceScheduleTimePeriod {
    return this._wednesday;
  }
  set wednesday(value: ServiceScheduleTimePeriod) {
    this._wednesday = value;
  }

  @AutoMap(() => TimePeriod)
  get thursday(): ServiceScheduleTimePeriod {
    return this._thursday;
  }
  set thursday(value: ServiceScheduleTimePeriod) {
    this._thursday = value;
  }

  @AutoMap(() => TimePeriod)
  get friday(): ServiceScheduleTimePeriod {
    return this._friday;
  }
  set friday(value: ServiceScheduleTimePeriod) {
    this._friday = value;
  }

  @AutoMap(() => TimePeriod)
  get saturday(): ServiceScheduleTimePeriod {
    return this._saturday;
  }
  set saturday(value: ServiceScheduleTimePeriod) {
    this._saturday = value;
  }

  @AutoMap(() => TimePeriod)
  get sunday(): ServiceScheduleTimePeriod {
    return this._sunday;
  }
  set sunday(value: ServiceScheduleTimePeriod) {
    this._sunday = value;
  }
}
