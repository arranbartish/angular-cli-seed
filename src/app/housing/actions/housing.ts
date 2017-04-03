import {type} from '../../utilities/type';
import {Action} from '@ngrx/store';
import {House} from '../domain/housing';

export const HousingAction = {
  SEARCH: type('House - Search'),
  ADD_HOUSE: type('House - Add house'),
  LIST_HOUSES: type('House - list houses'),
};


export class ActionFactory {

  static clearHouses(): Action {
    return this.listHouses([]);
  }

  static search(searchTerm: string): Action {
    return new SearchAction(searchTerm);
  }

  static searchComplete(results: House[]): Action {
    return this.listHouses(results);
  }

  static addHouse(house: House): Action {
    return new AddHouseAction(house);
  }

  static listHouses(list: House[]): Action {
    return new ListHousesAction(list);
  }

}

export class SearchAction implements Action {
  type = HousingAction.SEARCH;

  constructor(public payload: string) { }
}

export class AddHouseAction implements Action {
  type = HousingAction.ADD_HOUSE;

  constructor(public payload: House) { }
}

export class ListHousesAction implements Action {
  type = HousingAction.LIST_HOUSES;

  constructor(public payload: House[]) { }
}
