import { RegistrationAction, ActionFactory } from '../actions/registring';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { StartRegistrationAction } from '../actions/registring';
import { RegistrationService } from '../service/registration.service';

@Injectable()
export class RegistrationEffects {

  @Effect()
  startRegistration$: Observable<Action> = this.actions$
    .ofType(RegistrationAction.START_REGISTRATION)
    .map(toPayload)
    .switchMap(newRegistration => {
      return this.registrationService.startRegistration(newRegistration)
        .catch(error => {
          return of(null);
        });
    });

    @Effect()
    createRegistration$: Observable<Action> = this.actions$
    .ofType(RegistrationAction.CREATE_REGISTRATION)
    .map(toPayload)
    .switchMap(registration => {
      return this.registrationService.createRegistration(registration)
        .catch(error => {
          return of(null);
        });
    });

    @Effect()
    abortRegistration$: Observable<Action> = this.actions$
    .ofType(RegistrationAction.ABORT_REGISTRATIONS)
    .map(toPayload)
    .switchMap(registration => {
      return this.registrationService.abortRegistration(registration)
        .catch(error => {
          return of(null);
        });
    });


  constructor(private actions$: Actions, private registrationService: RegistrationService) {
  }


}
