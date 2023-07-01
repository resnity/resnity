import { AutoMap } from '@automapper/classes';

import { ValueObject } from '@resnity/backend-common';

import { assertImageUrl } from './image.value-object.assertions';
import { CreateImagePayload, ImageUrl } from './image.value-object.types';

export class Image extends ValueObject {
  private _url: ImageUrl;

  static create(payload: CreateImagePayload) {
    return Image.new(payload);
  }

  static new(payload: CreateImagePayload) {
    assertImageUrl(payload.url);
    const image = new Image();
    image.url = payload.url;
    return image;
  }

  @AutoMap(() => String)
  get url(): ImageUrl {
    return this._url;
  }
  set url(value: ImageUrl) {
    this._url = value;
  }
}
