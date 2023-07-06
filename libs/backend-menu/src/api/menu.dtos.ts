import { AutoMap } from '@automapper/classes';

import { EmbeddedResponseDto, ResponseDto } from '@resnity/backend-common';

import {
  AddCategoryServicePayload,
  CreateMenuServicePayload,
  UpdateMenuServicePayload,
} from '../application/menu.services.types';
import { RawPriceCurrency } from '../domain/value-objects/price.value-object.types';

export class PriceResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly amount: number;
  @AutoMap(() => String)
  readonly currency: RawPriceCurrency;
}

export class ImageResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly url: string;
}

export class TimePeriodResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly startTime: string;
  @AutoMap()
  readonly endTime: string;
}

export class ServiceScheduleResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly name: string;
  @AutoMap(() => TimePeriodResponseDto)
  readonly monday: TimePeriodResponseDto;
  @AutoMap(() => TimePeriodResponseDto)
  readonly tuesday: TimePeriodResponseDto;
  @AutoMap(() => TimePeriodResponseDto)
  readonly wednesday: TimePeriodResponseDto;
  @AutoMap(() => TimePeriodResponseDto)
  readonly thursday: TimePeriodResponseDto;
  @AutoMap(() => TimePeriodResponseDto)
  readonly friday: TimePeriodResponseDto;
  @AutoMap(() => TimePeriodResponseDto)
  readonly saturday: TimePeriodResponseDto;
  @AutoMap(() => TimePeriodResponseDto)
  readonly sunday: TimePeriodResponseDto;
}

export class CategoryResponseDto extends ResponseDto {
  @AutoMap(() => [String])
  readonly itemIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => ServiceScheduleResponseDto)
  readonly serviceSchedule: ServiceScheduleResponseDto;
}

export class ItemResponseDto extends ResponseDto {
  @AutoMap(() => [String])
  readonly modifierIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => PriceResponseDto)
  readonly price: PriceResponseDto;
  @AutoMap()
  readonly images: ImageResponseDto[];
}

export class ModifierResponseDto extends ResponseDto {
  @AutoMap(() => String)
  readonly itemId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => PriceResponseDto)
  readonly price: PriceResponseDto;
  @AutoMap()
  readonly minSelection: number;
  @AutoMap()
  readonly maxSelection: number;
  @AutoMap()
  readonly isRepeatable: boolean;
}

export class MenuResponseDto extends ResponseDto {
  @AutoMap(() => String)
  readonly restaurantId: string;
  @AutoMap()
  readonly name: string;
  @AutoMap(() => [CategoryResponseDto])
  readonly categories: CategoryResponseDto[];
  @AutoMap(() => [ItemResponseDto])
  readonly items: ItemResponseDto[];
  @AutoMap(() => [ModifierResponseDto])
  readonly modifiers: ModifierResponseDto[];
}

export class CreateMenuRequestBody implements CreateMenuServicePayload {
  readonly name: string;
  readonly restaurantId: string;
}

export class UpdateMenuRequestBody implements UpdateMenuServicePayload {
  readonly name?: string;
}

export class AddCategoryRequestBody
  implements Omit<AddCategoryServicePayload, 'menuId'>
{
  readonly name: string;
  readonly itemIds: string[];
}

class UpdateTimePeriodBody {
  readonly startTime?: string;
  readonly endTime?: string;
}

export class UpdateServiceScheduleBody {
  readonly name?: string;
  readonly monday?: UpdateTimePeriodBody;
  readonly tuesday?: UpdateTimePeriodBody;
  readonly wednesday?: UpdateTimePeriodBody;
  readonly thursday?: UpdateTimePeriodBody;
  readonly friday?: UpdateTimePeriodBody;
  readonly saturday?: UpdateTimePeriodBody;
  readonly sunday?: UpdateTimePeriodBody;
}
