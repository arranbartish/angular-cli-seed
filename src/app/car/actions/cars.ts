import {type} from '../../utilities/type';
import {Action} from '@ngrx/store';
import {Car} from '../domain/car';

export const CarAction = {
  SEARCH: type('Car - Search'),
  ADD_CAR: type('Car - Add car'),
  LIST_CARS: type('Car - list cars'),
};


export class ActionFactory {

  static clearCars(): Action {
    return this.listCars([]);
  }

  static search(searchTerm: string): Action {
    return new SearchAction(searchTerm);
  }

  static searchComplete(results: Car[]): Action {
    return this.listCars(results);
  }

  static addCar(car: Car): Action {
    return new AddCarAction(car);
  }

  static listCars(list: Car[]): Action {
    return new ListCarsAction(list);
  }

}

export class SearchAction implements Action {
  type = CarAction.SEARCH;

  constructor(public payload: string) { }
}

export class AddCarAction implements Action {
  type = CarAction.ADD_CAR;

  constructor(public payload: Car) { }
}

export class ListCarsAction implements Action {
  type = CarAction.LIST_CARS;

  constructor(public payload: Car[]) { }
}
