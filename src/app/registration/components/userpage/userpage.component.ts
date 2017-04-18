import { RegistrationsState } from './../../domain/registration';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { UserDetails, Registration } from '../../domain/registration';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'userpage.component.html'

})
export class UserPageComponent implements OnInit {
    public registration: Registration;

    public constructor(private router: Router, private registringStore: Store<RegistrationsState>) {
    }

    ngOnInit() {
        this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);
    }



}