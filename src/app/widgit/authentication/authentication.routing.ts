import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterInfoComponent } from './register/register-info.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterInfoComponent },
    { path: '**', redirectTo: '/home' }  // redirect to home.
];

export const authenticationRouting = RouterModule.forRoot(appRoutes);