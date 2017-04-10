import { ActionFactory } from './../../actions/registring';
import { RegistrationsState, User } from './../../domain/registration';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Registration } from '../../domain/registration';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registration-avatar',
  templateUrl: 'registration-avatar.component.html',

})
export class RegistrationAvatarComponent implements OnInit {


  public registration: Registration;

  public constructor(private router: Router, private registringStore: Store<RegistrationsState>) {
  }

  ngOnInit() {
    this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);
  }

  upload(data: any) {
    this.registration.user.avatar = data.src;
  }

  public register() {
    this.registringStore.dispatch(ActionFactory.createRegistration(this.registration));
    this.router.navigate(['/profile']);
  }

  public abort() {
    this.registringStore.dispatch(ActionFactory.abortRegistration(this.registration));
    this.router.navigate(['/home']);
  }

}