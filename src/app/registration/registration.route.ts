import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationDetailsComponent } from './components/details/registration-details.component';
import { RegistrationPictureComponent } from './components/picture/registration-picture.component';
import { UserPageComponent } from './components/userpage/userpage.component';
import { RegistrationGuard } from './guards/registration.guard';
import { RegistrationModule } from './registration.module';
import { RegistrationComponent } from './containers/registration/registration.component';

const routes: Routes = [
  {
    path: 'register/:step',
    redirectTo: '/register/init/0',
    pathMatch: 'full'
  },
  {
    path: 'init/:step',
    component: RegistrationComponent
  },
  {
    path: 'contact/:step',
    component: RegistrationDetailsComponent
  },
  {
    path: 'avatar/:step',
    canActivate: [RegistrationGuard],
    component: RegistrationPictureComponent
  },
  {
    path: 'profile',
    canActivate: [RegistrationGuard],
    component: UserPageComponent
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
