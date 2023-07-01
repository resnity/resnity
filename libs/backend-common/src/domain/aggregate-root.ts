import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEvent } from './domain-event';
import { Entity, EntityId } from './entity';

export class AggregateRoot<TId extends EntityId> extends Entity<TId> {
  private _events: DomainEvent[] = [];

  async publishEvents(eventEmitter: EventEmitter2): Promise<void> {
    await Promise.all(
      this._events.map((domainEvent) =>
        eventEmitter.emitAsync(domainEvent.constructor.name, domainEvent),
      ),
    );
    this._clearEvents();
  }

  protected _addEvent(domainEvent: DomainEvent): void {
    this._events.push(domainEvent);
  }

  protected _clearEvents(): void {
    this._events = [];
  }
}
