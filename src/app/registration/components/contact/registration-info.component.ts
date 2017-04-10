import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Registration, User, RegistrationsState } from '../../domain/registration';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registration-info',
  templateUrl: 'registration-info.component.html',
})
export class RegistrationInfoComponent implements OnInit {

  @Input()
  public registration: Registration;

  public user: User = new User();

  @Output()
  public registrationStarted: EventEmitter<Registration>;

  @Output()
  public registrationAborted: EventEmitter<Registration>;

  public registrationForm: FormGroup;
  public constructor(private formBuilder: FormBuilder) {
    this.registrationStarted = new EventEmitter<Registration>();
    this.registrationAborted = new EventEmitter<Registration>();

    this.registrationForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  ngOnInit() {
  }

  public startRegistration() {
    /* if (!this.registrationForm.valid) {
       return;
     }*/
    this.registration.user = this.user;
    this.registrationStarted.emit(this.registration);
  }
  public abort() {
    this.registration = new Registration();
    this.registrationAborted.emit(this.registration);
  }
}