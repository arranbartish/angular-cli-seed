import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { RegistrationService } from '../service/registration.service';
import { ActionFactory } from '../actions/registring';
import { RegistrationsState } from '../domain/registration';

@Injectable()
export class RegistrationGuard implements CanActivate {

  constructor(private store: Store<RegistrationsState>,
    private registrationService: RegistrationService) {
  }

  getRegistration(): Observable<boolean> {
    /*return this.store.select(state => state.registration.userDetails)
      .map(userDetails => 
      userDetails.username != null)*/
   
     return this.registrationService.getRegistration()
       .do(registration => {
         this.store.dispatch(ActionFactory.getRegistration(registration))
       })
       .map(registration =>  
         [0,1].indexOf(registration.status) !== -1)
   
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getRegistration();
  }
}
