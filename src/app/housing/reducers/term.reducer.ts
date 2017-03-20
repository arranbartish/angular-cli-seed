import {Action} from '@ngrx/store';
import {HousingAction} from '../actions/housing';

const types: string[] = [];

export const term = (state: string = '', action: Action ) => {

  types.push(action.type);

  switch (action.type) {
    case HousingAction.SEARCH:
      return action.payload;
    default:
      return state;
  }
};
