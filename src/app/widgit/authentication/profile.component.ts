import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
    providers: [AuthenticationService]
})
export class ProfileComponent implements OnInit {
    currentUser: User = new User();
    constructor(private authenticationService: AuthenticationService, private userService: UserService) {
        // get the user from state.
        // this.currentUser = state.select("userProfile-name");
    }
    ngOnInit() { }

    logout(user) {
        this.authenticationService.logout(user);
    }
}