import { CreateEventPayload, DomainEvent } from '@resnity/backend-common';

export class RestaurantCreatedEvent extends DomainEvent {
  readonly name: string;

  constructor(payload: CreateEventPayload<RestaurantCreatedEvent>) {
    super(payload);
    this.name = payload.name;
  }
}
