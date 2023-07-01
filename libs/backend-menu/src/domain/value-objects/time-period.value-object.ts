import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import {
  assertTimePeriodEndTime,
  assertTimePeriodStartTime,
} from './time-period.value-object.assertions';
import {
  CreateTimePeriodPayload,
  TimePeriodEndTime,
  TimePeriodStartTime,
} from './time-period.value-object.types';

export class TimePeriod extends ValueObject {
  private _startTime: TimePeriodStartTime;
  private _endTime: TimePeriodEndTime;

  static create(payload: CreateTimePeriodPayload) {
    return TimePeriod.new(payload);
  }

  static createWithDefaultValue() {
    return TimePeriod.new({
      startTime: '00:00:00',
      endTime: '00:00:00',
    });
  }

  static new(payload: CreateTimePeriodPayload) {
    assertTimePeriodStartTime(payload.startTime);
    assertTimePeriodEndTime(payload.endTime);

    const timePeriod = new TimePeriod();
    timePeriod.startTime = payload.startTime;
    timePeriod.endTime = payload.endTime;
    return timePeriod;
  }

  @AutoMap(() => String)
  get startTime(): TimePeriodStartTime {
    return this._startTime;
  }
  set startTime(value: TimePeriodStartTime) {
    this._startTime = value;
  }

  @AutoMap(() => String)
  get endTime(): TimePeriodEndTime {
    return this._endTime;
  }
  set endTime(value: TimePeriodEndTime) {
    this._endTime = value;
  }
}
