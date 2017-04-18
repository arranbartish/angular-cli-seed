import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionFactory } from '../../actions/registring';
import { SearchOptions } from '../../../widgit/search-form/search-options';
import { RegistrationsState, Registration, RegistrationStatus, RegistrationSteps } from '../../domain/registration';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
})
export class RegistrationComponent implements OnInit {

  registration: Registration;
  constructor(private route: ActivatedRoute, private router: Router, private registringStore: Store<RegistrationsState>) {
  }

  ngOnInit() {
    this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);
  }

  public register(userDetails: any) {
    this.registringStore.dispatch(ActionFactory.addUserDetails(userDetails));
    this.registringStore.dispatch(ActionFactory.updateRegistration(RegistrationStatus.INITIATED));
    this.navigate();


    //this.router.navigate(['/avatar'], );
  }
  navigate() {
    this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);

    this.router.navigate([{ outlets: { primary: "avatar" + "/" + RegistrationSteps.AVATAR } }],
      { relativeTo: this.route.root, preserveQueryParams: false, skipLocationChange: false });


  }

}
