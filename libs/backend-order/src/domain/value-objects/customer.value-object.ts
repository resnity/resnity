import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import { Contact } from './contact.value-object';
import {
  CustomerContact,
  CustomerName,
  CustomerUserId,
} from './customer.value-object.types';

export class Customer extends ValueObject {
  private _userId: CustomerUserId;
  private _name: CustomerName;
  private _contact: CustomerContact;

  @AutoMap(() => String)
  get userId(): CustomerUserId {
    return this._userId;
  }
  set userId(value: CustomerUserId) {
    this._userId = value;
  }

  @AutoMap(() => String)
  get name(): CustomerName {
    return this._name;
  }
  set name(value: CustomerName) {
    this._name = value;
  }

  @AutoMap(() => Contact)
  get contact(): CustomerContact {
    return this._contact;
  }
  set contact(value: CustomerContact) {
    this._contact = value;
  }
}
