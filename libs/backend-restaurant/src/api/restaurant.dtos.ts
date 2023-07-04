import { AutoMap } from '@automapper/classes';

import { EmbeddedResponseDto, ResponseDto } from '@resnity/backend-common';

import {
  CreateAddressServicePayload,
  CreateOutletServicePayload,
  CreateRestaurantServicePayload,
  CreateServiceScheduleServicePayload,
  CreateTableServicePayload,
  CreateTimePeriodServicePayload,
  UpdateOutletServicePayload,
  UpdateRestaurantServicePayload,
  UpdateTableServicePayload,
} from '../application/restaurant.services.types';

export class AddressResponseDto extends EmbeddedResponseDto {
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

export class ContactResponseDto extends EmbeddedResponseDto {
  @AutoMap()
  readonly phoneNumber: string;
  @AutoMap()
  readonly email?: string;
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

export class TableResponseDto extends ResponseDto {
  @AutoMap()
  readonly code: string;
  @AutoMap()
  readonly capacity: number;
}

export class OutletResponseDto extends ResponseDto {
  @AutoMap(() => [String])
  readonly menuIds: string[];
  @AutoMap(() => [String])
  readonly orderIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => [TableResponseDto])
  readonly tables: TableResponseDto[];
  @AutoMap(() => AddressResponseDto)
  readonly address: AddressResponseDto;
  @AutoMap(() => ContactResponseDto)
  readonly contact: ContactResponseDto;
  @AutoMap(() => ServiceScheduleResponseDto)
  readonly serviceSchedule: ServiceScheduleResponseDto;
}

export class RestaurantResponseDto extends ResponseDto {
  @AutoMap(() => [String])
  readonly menuIds: string[];
  @AutoMap()
  readonly name: string;
  @AutoMap(() => [OutletResponseDto])
  readonly outlets: OutletResponseDto[];
}

export class CreateRestaurantRequestBody
  implements CreateRestaurantServicePayload
{
  readonly name: string;
}

export class UpdateRestaurantRequestBody
  implements UpdateRestaurantServicePayload
{
  readonly menuIds?: string[];
  readonly name?: string;
}

export class CreateAddressRequestBody implements CreateAddressServicePayload {
  readonly line1: string;
  readonly line2?: string;
  readonly line3?: string;
  readonly postcode: string;
  readonly city?: string;
  readonly state: string;
  readonly country: string;
}

export class CreateContactRequestBody implements CreateContactRequestBody {
  readonly phoneNumber: string;
  readonly email?: string;
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

export class CreateOutletRequestBody implements CreateOutletServicePayload {
  readonly menuIds: string[];
  readonly orderIds: string[];
  readonly name: string;
  readonly address: CreateAddressRequestBody;
  readonly contact: CreateContactRequestBody;
  readonly serviceSchedule: CreateServiceScheduleRequestBody;
}

export class UpdateOutletRequestBody implements UpdateOutletServicePayload {
  readonly menuIds?: string[];
  readonly orderIds?: string[];
  readonly name?: string;
  readonly address?: CreateAddressRequestBody;
  readonly contact?: CreateContactRequestBody;
  readonly serviceSchedule?: CreateServiceScheduleRequestBody;
}

export class CreateTableRequestBody implements CreateTableServicePayload {
  readonly code: string;
  readonly capacity: number;
}

export class UpdateTableRequestBody implements UpdateTableServicePayload {
  readonly code?: string;
  readonly capacity?: number;
}
