import { RegistrationAction, ActionFactory } from '../actions/registring';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { RegistrationService } from '../service/registration.service';

@Injectable()
export class RegistrationEffects {

  @Effect()
  updateRegistration$: Observable<Action> = this.actions$
    .ofType(RegistrationAction.UPDATE_STATUS)
    .map(toPayload)
    .switchMap(newRegistration => {
      return this.registrationService.updateStatus(newRegistration)
        .catch(error => {
          return of(null);
        });
    });

  constructor(private actions$: Actions, private registrationService: RegistrationService) {
  }


}
