import { Injectable } from '@angular/core';
// import * as _ from "@types/lodash";

@Injectable()
export class ObjectService {
  constructor() {
  }

  // deepCopy<T>(source: T) {
  // only does shallow cause lodash will not resolve
  shallowCopy<T>(target: T, source: T) {
    return Object.assign(target, source);
  }
}
