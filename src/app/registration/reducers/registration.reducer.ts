import { Action } from '@ngrx/store';
import { Registration } from '../domain/registration';
import { RegistrationAction } from '../actions/registring';

export const registration = (state: any = new Registration(), action: Action) => {
  switch (action.type) {
    case RegistrationAction.START_REGISTRATION:
      return action.payload;
    case RegistrationAction.CREATE_REGISTRATION:
      return action.payload;
    case RegistrationAction.ABORT_REGISTRATIONS:
      return action.payload;
    default:
      return state;
  }
};
