export type CreateRestaurantRequestDto = {
  name: string;
};

export type CreateRestaurantResponseDto = {
  id: string;
};

type AddressResponseDto = {
  line1: string;
  line2?: string;
  line3?: string;
  postcode: string;
  city?: string;
  state: string;
  country: string;
};

type ContactResponseDto = {
  phoneNumber: string;
  email?: string;
};

type TimePeriodResponseDto = {
  startTime: string;
  endTime: string;
};

type ServiceScheduleResponseDto = {
  name: string;
  monday: TimePeriodResponseDto;
  tuesday: TimePeriodResponseDto;
  wednesday: TimePeriodResponseDto;
  thursday: TimePeriodResponseDto;
  friday: TimePeriodResponseDto;
  saturday: TimePeriodResponseDto;
  sunday: TimePeriodResponseDto;
};

type TableResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  capacity: number;
};

type OutletResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  menuIds: string[];
  orderIds: string[];
  name: string;
  tables: TableResponseDto[];
  address: AddressResponseDto;
  contact: ContactResponseDto;
  serviceSchedule: ServiceScheduleResponseDto;
};

export type RestaurantResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  menuIds: string[];
  name: string;
  outlets: OutletResponseDto[];
};
