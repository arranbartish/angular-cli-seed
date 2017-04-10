import { RegistrationsState } from './../../domain/registration';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { User, Registration } from '../../domain/registration';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'

})
export class ProfileComponent implements OnInit {
    public registration: Registration;

    public constructor(private router: Router, private registringStore: Store<RegistrationsState>) {
    }

    ngOnInit() {
        this.registringStore.select(state => state.registration).subscribe(registration => this.registration = registration);
    }



}