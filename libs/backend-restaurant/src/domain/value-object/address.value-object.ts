import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import {
  assertAddressCountry,
  assertAddressLine1,
  assertAddressPostcode,
  assertAddressState,
  assertOptionalAddressCity,
  assertOptionalAddressLine2,
  assertOptionalAddressLine3,
} from './address.value-object.assertions';
import {
  AddressCity,
  AddressCountry,
  AddressLine1,
  AddressLine2,
  AddressLine3,
  AddressPostcode,
  AddressState,
  CreateAddressPayload,
} from './address.value-object.types';

export class Address extends ValueObject {
  private _line1: AddressLine1;
  private _line2?: AddressLine2;
  private _line3?: AddressLine3;
  private _postcode: AddressPostcode;
  private _city?: AddressCity;
  private _state: AddressState;
  private _country: AddressCountry;

  static create(payload: CreateAddressPayload) {
    return Address.new(payload);
  }

  static new(payload: CreateAddressPayload) {
    assertAddressLine1(payload.line1);
    assertOptionalAddressLine2(payload.line2);
    assertOptionalAddressLine3(payload.line3);
    assertAddressPostcode(payload.postcode);
    assertOptionalAddressCity(payload.city);
    assertAddressState(payload.state);
    assertAddressCountry(payload.country);

    const address = new Address();
    address.line1 = payload.line1;
    address.line2 = payload.line2;
    address.line3 = payload.line3;
    address.postcode = payload.postcode;
    address.city = payload.city;
    address.state = payload.state;
    address.country = payload.country;
    return address;
  }

  @AutoMap(() => String)
  get line1(): AddressLine1 {
    return this._line1;
  }
  set line1(value: AddressLine1) {
    this._line1 = value;
  }

  @AutoMap(() => String)
  get line2(): AddressLine2 | undefined {
    return this._line2;
  }
  set line2(value: AddressLine2 | undefined) {
    this._line2 = value;
  }

  @AutoMap(() => String)
  get line3(): AddressLine3 | undefined {
    return this._line3;
  }
  set line3(value: AddressLine3 | undefined) {
    this._line3 = value;
  }

  @AutoMap(() => String)
  get postcode(): AddressPostcode {
    return this._postcode;
  }
  set postcode(value: AddressPostcode) {
    this._postcode = value;
  }

  @AutoMap(() => String)
  get city(): AddressCity | undefined {
    return this._city;
  }
  set city(value: AddressCity | undefined) {
    this._city = value;
  }

  @AutoMap(() => String)
  get state(): AddressState {
    return this._state;
  }
  set state(value: AddressState) {
    this._state = value;
  }

  @AutoMap(() => String)
  get country(): AddressCountry {
    return this._country;
  }
  set country(value: AddressCountry) {
    this._country = value;
  }
}
