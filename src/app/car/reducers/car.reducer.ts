import {Action} from '@ngrx/store';
import {CarAction} from '../actions/cars';

export const cars = (state: any = [], action: Action ) => {

  switch (action.type) {
    case CarAction.ADD_CAR:
      return [...state, action.payload];
    case CarAction.LIST_CARS:
      return [...action.payload];
    default:
      return state;
  }
};
