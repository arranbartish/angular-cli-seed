export interface Car {
  brand: string;
  model: string;
  year: string;
  condition: string;
}


export interface CarState {
  cars: Car[];
}

export enum CarAction {
  ADD_CAR,
  SET_CARS
}
