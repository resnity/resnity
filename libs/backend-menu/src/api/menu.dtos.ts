import { AutoMap } from '@automapper/classes';

import { EmbeddedResponseDto, ResponseDto } from '@resnity/backend-common';

import {
  CreateCategoryServicePayload,
  CreateImageServicePayload,
  CreateItemServicePayload,
  CreateModifierServicePayload,
  CreatePriceServicePayload,
  CreateServiceScheduleServicePayload,
  CreateTimePeriodServicePayload,
  UpdateItemServicePayload,
  UpdateModifierServicePayload,
} from '../application/menu.service.types';
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

export class CreateMenuRequestBody {
  readonly name: string;
}

export class UpdateMenuRequestBody {
  readonly name?: string;
}

export class CreateTimePeriodRequestBody
  implements CreateTimePeriodServicePayload
{
  readonly startTime: string;
  readonly endTime: string;
}

export class CreateServiceScheduleRequestBody
  implements CreateServiceScheduleServicePayload
{
  readonly name: string;
  readonly monday: CreateTimePeriodRequestBody;
  readonly tuesday: CreateTimePeriodRequestBody;
  readonly wednesday: CreateTimePeriodRequestBody;
  readonly thursday: CreateTimePeriodRequestBody;
  readonly friday: CreateTimePeriodRequestBody;
  readonly saturday: CreateTimePeriodRequestBody;
  readonly sunday: CreateTimePeriodRequestBody;
}

export class CreateCategoryRequestBody implements CreateCategoryServicePayload {
  readonly name: string;
  readonly serviceSchedule: CreateServiceScheduleRequestBody;
}

export class UpdateCategoryRequestBody implements UpdateCategoryRequestBody {
  readonly itemIds?: string[];
  readonly name?: string;
  readonly serviceSchedule?: CreateServiceScheduleRequestBody;
}

export class CreatePriceRequestBody implements CreatePriceServicePayload {
  readonly amount: number;
  readonly currency: RawPriceCurrency;
}

export class CreateImageRequestBody implements CreateImageServicePayload {
  readonly url: string;
}

export class CreateItemRequestBody implements CreateItemServicePayload {
  readonly modifierIds: string[];
  readonly name: string;
  readonly price: CreatePriceRequestBody;
  readonly images: CreateImageRequestBody[];
}

export class UpdateItemRequestBody implements UpdateItemServicePayload {
  readonly modifierIds?: string[];
  readonly name?: string;
  readonly price?: CreatePriceRequestBody;
  readonly images?: CreateImageRequestBody[];
}

export class CreateModifierRequestBody implements CreateModifierServicePayload {
  readonly itemId: string;
  readonly name: string;
  readonly minSelection: number;
  readonly maxSelection: number;
  readonly isRepeatable: boolean;
  readonly price: CreatePriceRequestBody;
}

export class UpdateModifierRequestBody implements UpdateModifierServicePayload {
  readonly name?: string;
  readonly minSelection?: number;
  readonly maxSelection?: number;
  readonly isRepeatable?: boolean;
  readonly price?: CreatePriceRequestBody;
}
