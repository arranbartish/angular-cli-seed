import { Action } from '@ngrx/store';

import { House } from '../domain/housing';
import { type } from '../../utilities/type';

export const HousingAction = {
  SEARCH: type('House - Search'),
  ADD_HOUSE: type('House - Add house'),
  LIST_HOUSES: type('House - list houses')
};

export class ActionFactory {
  static clearHouses(): Action {
    return ActionFactory.listHouses([]);
  }

  static search(searchTerm: string): Action {
    return new SearchAction(searchTerm);
  }

  static searchComplete(results: House[]): Action {
    return ActionFactory.listHouses(results);
  }

  static addHouse(house: House): Action {
    return new AddHouseAction(house);
  }

  static listHouses(list: House[]): Action {
    return new ListHousesAction(list);
  }
}

export class SearchAction implements Action {
  type: string;
  payload?: any;

  constructor(payload: string) {
    this.type = HousingAction.SEARCH;
    this.payload = payload;
  }
}

export class AddHouseAction implements Action {
  type: string;
  payload?: any;

  constructor(payload: House) {
    this.type = HousingAction.ADD_HOUSE;
    this.payload = payload;
  }
}

export class ListHousesAction implements Action {
  type: string;
  payload?: any;

  constructor(payload: House[]) {
    this.type = HousingAction.LIST_HOUSES;
    this.payload = payload;
  }
}
