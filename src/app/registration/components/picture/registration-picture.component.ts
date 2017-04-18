import { ActionFactory } from './../../actions/registring';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Registration, UserDetails, RegistrationsState } from '../../domain/registration';
import { Store } from '@ngrx/store';
import { RegistrationService } from '../../service/registration.service';

@Component({
  selector: 'app-registration-picture',
  templateUrl: 'registration-picture.component.html',

})
export class RegistrationPictureComponent implements OnInit {

  //@Input()
  public userDetails: UserDetails;

  @Output()
  public updateDetails: EventEmitter<UserDetails>;

  userAvatar: any;

  public constructor( private route: ActivatedRoute, public router: Router, public registrationService: RegistrationService) {
      this.updateDetails = new EventEmitter<UserDetails>();
  }

  ngOnInit() {
    this.registrationService.getRegistration().subscribe(reg => this.userDetails = reg.userDetails);
    // this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);
  }

  upload(data: any) {
    this.userAvatar = data.src;
  }

  public addAvatar() {
    if (!this.userDetails)
      this.userDetails = new UserDetails();
    this.userDetails.avatar = this.userAvatar;
    this.updateDetails.emit(this.userDetails);  
}

  public cancel() {
    this.router.navigate(['/home']);
  }

}