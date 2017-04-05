import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { authenticationRouting } from './authentication.routing';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterInfoComponent } from './register/register-info.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        authenticationRouting,
    ],
    declarations: [
        ProfileComponent,
        LoginComponent,
        RegisterInfoComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
    ],
    exports: [
        ProfileComponent,
        LoginComponent,
        RegisterInfoComponent
    ]
})
export class AuthenticationModule { }