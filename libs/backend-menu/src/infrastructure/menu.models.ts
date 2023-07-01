import { AutoMap } from '@automapper/classes';

import { EmbeddedModel, Model } from '@resnity/backend-common';

import { RawPriceCurrency } from '../domain/value-objects/price.value-object.types';

export class PriceModel extends EmbeddedModel {
  @AutoMap()
  readonly amount: number;
  @AutoMap(() => String)
  readonly currency: RawPriceCurrency;
}

export class ImageModel extends EmbeddedModel {
  @AutoMap()
  readonly url: string;
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

export class CategoryModel extends Model {
  @AutoMap(() => [String])
  readonly itemIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => ServiceScheduleModel)
  readonly serviceSchedule: ServiceScheduleModel;
}

export class ItemModel extends Model {
  @AutoMap(() => [String])
  readonly modifierIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => PriceModel)
  readonly price: PriceModel;
  @AutoMap()
  readonly images: ImageModel[];
}

export class ModifierModel extends Model {
  @AutoMap(() => String)
  readonly itemId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => PriceModel)
  readonly price: PriceModel;
  @AutoMap()
  readonly minSelection: number;
  @AutoMap()
  readonly maxSelection: number;
  @AutoMap()
  readonly isRepeatable: boolean;
}

export class MenuModel extends Model {
  @AutoMap(() => String)
  readonly restaurantId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => [CategoryModel])
  readonly categories: CategoryModel[];
  @AutoMap(() => [ItemModel])
  readonly items: ItemModel[];
  @AutoMap(() => [ModifierModel])
  readonly modifiers: ModifierModel[];
}
