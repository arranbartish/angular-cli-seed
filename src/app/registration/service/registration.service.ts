import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Registration } from '../domain/registration';

@Injectable()
export class RegistrationService {

  private record: Registration;

  constructor(private http: Http) {
    this.record = new Registration();
  }

  startRegistration(newRegistration: Registration): Observable<Registration> {
    this.record.status = 'started';
    this.record.user = newRegistration.user;
    return of(this.record);
  }

  createRegistration(registration: Registration): Observable<Registration> {
    this.record.status = 'created';
    this.record.user = registration.user;
    return of(this.record);
  }

  abortRegistration(registration: Registration): Observable<Registration> {
    this.record.status = 'aborted';
    this.record.user = registration.user;
    return of(registration);
  }
  
  getLatestRegistration() {
    return of(this.record);
  }

}
