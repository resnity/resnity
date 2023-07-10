type PriceResponseDto = {
  amount: number;
  currency: string;
};

type ImageResponseDto = {
  url: string;
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

type CategoryResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  itemIds: string[];
  name: string;
  serviceSchedule: ServiceScheduleResponseDto;
};

type ItemResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  modifierIds: string[];
  name: string;
  price: PriceResponseDto;
  images: ImageResponseDto[];
};

type ModifierResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  itemId: string;
  name: string;
  price: PriceResponseDto;
  minSelection: number;
  maxSelection: number;
  isRepeatable: boolean;
};

export type MenuResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
  name: string;
  categories: CategoryResponseDto[];
  items: ItemResponseDto[];
  modifiers: ModifierResponseDto[];
};

export type CreateMenuRequestDto = {
  name: string;
};

export type CreateMenuResponseDto = {
  id: string;
};

export type DeleteMenuByIdParam = string;
