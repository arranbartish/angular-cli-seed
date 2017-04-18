import { Registration } from './../domain/registration';
import { type } from '../../utilities/type';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { UserDetails, RegistrationStatus } from '../domain/registration';

export const RegistrationAction = {
  ADD_USERDETAILS: type('UserDetails - Add user details'),
  UPDATE_STATUS: type('Status - update registration status'),
};


export class ActionFactory {


  static addUserDetails(userDetails: UserDetails): Action {
    return new UserDetailsAction(userDetails);
  }

  static updateRegistration(status: RegistrationStatus): Action {
    return new UpdateStatusAction(status);
  }

  static getRegistration(registration) {
    return registration;
  }
 
  static empty() {
    return new Registration();
  }
}

export class UserDetailsAction implements Action {
  type = RegistrationAction.ADD_USERDETAILS;

  constructor(public payload: UserDetails) { }
}


export class UpdateStatusAction implements Action {
  type = RegistrationAction.UPDATE_STATUS;

  constructor(public payload: RegistrationStatus) { }
}

