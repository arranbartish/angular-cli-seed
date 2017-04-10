import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionFactory } from '../../actions/registring';
import { SearchOptions } from '../../../widgit/search-form/search-options';
import { RegistrationsState, Registration } from '../../domain/registration';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
})
export class RegistrationComponent implements OnInit {

  registration: Registration;
  constructor(private router: Router, private registringStore: Store<RegistrationsState>) {
  }

  ngOnInit() {
    this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);
  }

  public registrationStarted() {
    this.registringStore.dispatch(ActionFactory.startRegistration(this.registration));
     this.router.navigate(['/avatar']);
  }

  public registrationAborted() {
    this.registringStore.dispatch(ActionFactory.abortRegistration(this.registration));
     this.router.navigate(['/home']);
  }
 

}
