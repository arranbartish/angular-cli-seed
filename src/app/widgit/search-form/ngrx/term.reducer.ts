import {Action} from '@ngrx/store';
import {SearchAction} from '../domain/search-event';

export const term = (state: string = '', action: Action ) => {

  switch (SearchAction[action.type]) {
    case SearchAction.CHANGE_TERM:
      return action.payload;
    default:
      return state;
  }
};
