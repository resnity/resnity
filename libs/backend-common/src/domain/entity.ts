import { AutoMap } from '@automapper/classes';
import { createId, isCuid } from '@paralleldrive/cuid2';
import { z } from 'zod';

export const EntityId = z.string().refine((value) => isCuid(value));
export type EntityId = z.infer<typeof EntityId>;

export const createEntityId = () => EntityId.parse(createId());

export type BaseEntityPayload<T> = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & T;

export type MaybeBaseEntityPayload<T> = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
} & T;

export class Entity<T extends EntityId> {
  protected _id: T;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  protected _setUpdatedAtToNow() {
    this._updatedAt = new Date();
  }

  @AutoMap(() => String)
  get id(): T {
    return this._id;
  }
  set id(value: T) {
    this._id = value;
  }

  @AutoMap()
  get createdAt(): Date {
    return this._createdAt;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }

  @AutoMap()
  get updatedAt(): Date {
    return this._updatedAt;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
