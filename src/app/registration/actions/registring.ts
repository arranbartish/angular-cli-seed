import { Registration } from './../domain/registration';
import { type } from '../../utilities/type';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

export const RegistrationAction = {
  START_REGISTRATION: type('Registration - start registration'),
  CREATE_REGISTRATION: type('Registration - Add registration'),
  ABORT_REGISTRATIONS: type('Registration - abort registrations'),
};


export class ActionFactory {


  static startRegistration(registration: Registration): Action {
    return new StartRegistrationAction(registration);
  }

  static createRegistration(registration: Registration): Action {
    return new CreateRegistrationAction(registration);
  }

  static abortRegistration(registration: Registration): Action {
    return new AbortRegistrationsAction(registration);
  }

  static getRegistration(registration) {
    return registration;
  }
  
  static empty() {
    return new Registration();
  }
}

export class StartRegistrationAction implements Action {
  type = RegistrationAction.START_REGISTRATION;

  constructor(public payload: Registration) { }
}


export class CreateRegistrationAction implements Action {
  type = RegistrationAction.CREATE_REGISTRATION;

  constructor(public payload: Registration) { }
}

export class AbortRegistrationsAction implements Action {
  type = RegistrationAction.ABORT_REGISTRATIONS;

  constructor(public payload: Registration) { }
}
