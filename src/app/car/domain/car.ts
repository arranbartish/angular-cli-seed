import {SeachState} from '../../widgit/search-form/domain/search-event';
export interface Car {
  brand: string;
  model: string;
  year: string;
  condition: string;
}


export interface CarState extends SeachState {
  cars: Car[];
}

export enum CarAction {
  ADD_CAR,
  SET_CARS
}
