import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import {
  assertContactPhoneNumber,
  assertOptionalEmail,
} from './contact.value-object.assertions';
import {
  ContactEmail,
  ContactPhoneNumber,
  CreateContactPayload,
} from './contact.value-object.types';

export class Contact extends ValueObject {
  private _phoneNumber: ContactPhoneNumber;
  private _email?: ContactEmail;

  static create(payload: CreateContactPayload) {
    return Contact.new(payload);
  }

  static new(payload: CreateContactPayload) {
    assertContactPhoneNumber(payload.phoneNumber);
    assertOptionalEmail(payload.email);

    const contact = new Contact();
    contact.phoneNumber = payload.phoneNumber;
    contact.email = payload.email;
    return contact;
  }

  @AutoMap(() => String)
  get phoneNumber(): ContactPhoneNumber {
    return this._phoneNumber;
  }
  set phoneNumber(value: ContactPhoneNumber) {
    this._phoneNumber = value;
  }

  @AutoMap(() => String)
  get email(): ContactEmail | undefined {
    return this._email;
  }
  set email(value: ContactEmail | undefined) {
    this._email = value;
  }
}
