export type CreateRestaurantServicePayload = {
  name: string;
};

export type UpdateRestaurantServicePayload = {
  menuIds?: string[];
  name?: string;
};

export type AddOutletServicePayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  address: {
    line1: string;
    line2?: string;
    line3?: string;
    postcode: string;
    city?: string;
    state: string;
    country: string;
  };
  contact: {
    phoneNumber: string;
    email?: string;
  };
  serviceSchedule: {
    name: string;
    monday: {
      startTime: string;
      endTime: string;
    };
    tuesday: {
      startTime: string;
      endTime: string;
    };
    wednesday: {
      startTime: string;
      endTime: string;
    };
    thursday: {
      startTime: string;
      endTime: string;
    };
    friday: {
      startTime: string;
      endTime: string;
    };
    saturday: {
      startTime: string;
      endTime: string;
    };
    sunday: {
      startTime: string;
      endTime: string;
    };
  };
};
