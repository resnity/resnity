import { AutoMap } from '@automapper/classes';

import { EmbeddedResponseDto, ResponseDto } from '@resnity/backend-common';

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

export class CreateRestaurantRequestBody {
  @AutoMap()
  readonly name: string;
}
