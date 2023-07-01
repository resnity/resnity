import * as _ from 'lodash';

export class ValueObject {
  clone() {
    return Object.freeze(_.clone(this));
  }

  equals(vo: ValueObject) {
    return JSON.stringify(this) === JSON.stringify(vo);
  }
}
