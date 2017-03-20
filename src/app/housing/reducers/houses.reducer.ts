import {Action} from '@ngrx/store';
import {HousingAction} from '../actions/housing';

export const houses = (state: any = [], action: Action ) => {

  switch (action.type) {
    case HousingAction.ADD_HOUSE:
      return [...state, action.payload];
    case HousingAction.LIST_HOUSES:
      return [...action.payload];
    default:
      return state;
  }
};
