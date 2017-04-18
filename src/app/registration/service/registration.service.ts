import { RegistrationsState } from './../domain/registration';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

import { Registration, RegistrationStatus, UserDetails } from '../domain/registration';

@Injectable()
export class RegistrationService {

  private record: Registration;

  constructor(private http: Http, private registringStore: Store<RegistrationsState>) {
    this.registringStore.select(state => state.registration).subscribe(registration => this.record = registration);
  }

  updateStatus(status: any): Observable<Registration> {
    let isValid: boolean = true;
    isValid = isValid && this.record.userDetails !== null && this.record.userDetails.username !== null;
    isValid = isValid && this.record.userDetails.password !== null;
    isValid = isValid && this.record.userDetails.avatar !== null;
    if (isValid) {
      this.record.status = status;
      return of(this.record);
    } else {
      return null;
    }
  }


  getRegistration() {
    /*
    let userInfo: UserDetails = new UserDetails();
    this.record = new Registration();
    this.record.userDetails = userInfo;
    */
    return of(this.record);
  }

}
