import {Action} from '@ngrx/store';
import {CarAction} from '../domain/car';

export const car = (state: any = [], action: Action ) => {

  switch (CarAction[action.type]) {
    case CarAction.ADD_CAR:
      return [...state, action.payload];
    case CarAction.SET_CARS:
      return [...action.payload];
    default:
      return state;
  }
};
