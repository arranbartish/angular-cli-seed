import { Action } from '@ngrx/store';
import { Registration } from '../domain/registration';
import { RegistrationAction } from '../actions/registring';
import * as _ from 'lodash';

export const registration = (state: Registration = new Registration(), action: Action) => {
  switch (action.type) {
    case RegistrationAction.ADD_USERDETAILS: {
      let newState: Registration = _.cloneDeep(state);
      newState.userDetails = action.payload;
      return newState;
    }
    case RegistrationAction.UPDATE_STATUS: {
      let newState: Registration = _.cloneDeep(state);
      newState.status = action.payload;;
      return newState;
    }
    default:
      return state;
  }
};
