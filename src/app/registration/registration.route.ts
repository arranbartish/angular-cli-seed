import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationInfoComponent } from './components/contact/registration-info.component';
import { RegistrationAvatarComponent } from './components/avatar/registration-avatar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationGuard } from './guards/registration.guard';
import { RegistrationModule } from './registration.module';
import { RegistrationComponent } from './containers/registration/registration.component';


const routes: Routes = [
  {
    path: 'register',
    redirectTo: '/register/init',
    pathMatch: 'full'
  },
  {
    path: 'init',
    component: RegistrationComponent
  },
  {
    path: 'contact',
    component: RegistrationInfoComponent
  },
  {
    path: 'avatar',
    canActivate: [RegistrationGuard],
    component: RegistrationAvatarComponent
  },
  {
    path: 'profile',
    canActivate: [RegistrationGuard],
    component: ProfileComponent
  }

];

@NgModule({
  exports: [
  ],
  imports: [
    RouterModule.forChild(routes),
    RegistrationModule,
    CommonModule
  ], declarations: []
})
export class RegistrationRouteModule { }
