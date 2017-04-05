import { User } from './../models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
@Component({
    moduleId: module.id,
    templateUrl: 'register-info.component.html'
})
export class RegisterInfoComponent {
    user: User = new User();
    constructor(private router: Router, private userService: UserService) { }
    register() {
        this.userService.register(this.user)
            .subscribe(
            data => {
                this.router.navigate(['/profile']);
            },
            error => {
                console.log("[authentication] registration error")
            });
    }
}
