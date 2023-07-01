import { createId } from '@paralleldrive/cuid2';

export abstract class DomainEvent {
  readonly id: string;
  readonly timestamp: string;
  readonly aggregateId: string;

  protected constructor(payload: CreateEventPayload<DomainEvent>) {
    this.id = payload?.id ?? createId();
    this.timestamp = new Date().toISOString();
    this.aggregateId = payload.aggregateId;
  }
}

export type CreateEventPayload<T> = Omit<T, 'id' | 'timestamp'> &
  Partial<DomainEvent>;
