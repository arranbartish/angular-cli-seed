import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Registration, UserDetails, RegistrationsState } from '../../domain/registration';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registration-details',
  templateUrl: 'registration-details.component.html',
})
export class RegistrationDetailsComponent implements OnInit {

 /* @Input()
  public registration: Registration;
*/
public userDetails: UserDetails;

  @Output()
  public register: EventEmitter<UserDetails>;

  public registrationForm: FormGroup;
  public constructor(public formBuilder: FormBuilder, public router: Router) {
    this.register = new EventEmitter<UserDetails>();
    this.userDetails = new UserDetails();
    this.registrationForm = this.formBuilder.group({
      firstName: [this.userDetails.firstName, Validators.required],
      lastName: [this.userDetails.lastName, Validators.required],
      username: [this.userDetails.username, Validators.required],
      email: [this.userDetails.email, Validators.required],
      password: [this.userDetails.password, Validators.required]
    });
  }

  ngOnInit() {
  }

  public registerUser() {
    /* 
    if (!this.registrationForm.valid) {
       return;
     }
     */
    this.register.emit(this.userDetails);
  }
//event for childs
public updateDetails(newDetails:any){
    this.register.emit(newDetails);
}

  public cancel() {
     this.router.navigate(['/home']);
  }

}