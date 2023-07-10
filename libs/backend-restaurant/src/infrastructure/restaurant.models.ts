import { AutoMap } from '@automapper/classes';

import { EmbeddedModel, Model } from '@resnity/backend-common';

export class AddressModel extends EmbeddedModel {
  @AutoMap()
  readonly line1: string;
  @AutoMap()
  readonly line2?: string;
  @AutoMap()
  readonly line3?: string;
  @AutoMap()
  readonly postcode: string;
  @AutoMap()
  readonly city?: string;
  @AutoMap()
  readonly state: string;
  @AutoMap()
  readonly country: string;
}

export class ContactModel extends EmbeddedModel {
  @AutoMap()
  readonly phoneNumber: string;
  @AutoMap()
  readonly email?: string;
}

export class TimePeriodModel extends EmbeddedModel {
  @AutoMap()
  readonly startTime: string;
  @AutoMap()
  readonly endTime: string;
}

export class ServiceScheduleModel extends EmbeddedModel {
  @AutoMap()
  readonly name: string;
  @AutoMap(() => TimePeriodModel)
  readonly monday: TimePeriodModel;
  @AutoMap(() => TimePeriodModel)
  readonly tuesday: TimePeriodModel;
  @AutoMap(() => TimePeriodModel)
  readonly wednesday: TimePeriodModel;
  @AutoMap(() => TimePeriodModel)
  readonly thursday: TimePeriodModel;
  @AutoMap(() => TimePeriodModel)
  readonly friday: TimePeriodModel;
  @AutoMap(() => TimePeriodModel)
  readonly saturday: TimePeriodModel;
  @AutoMap(() => TimePeriodModel)
  readonly sunday: TimePeriodModel;
}

export class TableModel extends Model {
  @AutoMap()
  readonly code: string;
  @AutoMap()
  readonly capacity: number;
}

export class StoreModel extends Model {
  @AutoMap(() => [String])
  readonly menuIds: string[];
  @AutoMap(() => [String])
  readonly orderIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => [TableModel])
  readonly tables: TableModel[];
  @AutoMap(() => AddressModel)
  readonly address: AddressModel;
  @AutoMap(() => ContactModel)
  readonly contact: ContactModel;
  @AutoMap(() => ServiceScheduleModel)
  readonly serviceSchedule: ServiceScheduleModel;
}

export class RestaurantModel extends Model {
  @AutoMap(() => [String])
  readonly menuIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap()
  readonly displayName?: string;
  @AutoMap(() => [StoreModel])
  readonly stores: StoreModel[];
}
