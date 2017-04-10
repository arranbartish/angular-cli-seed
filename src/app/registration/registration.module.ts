import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgitModule } from '../widgit/widgit.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { RegistrationComponent } from './containers/registration/registration.component';
import { ProfileComponent, RegistrationInfoComponent, RegistrationAvatarComponent } from './components/index';
import { RegistrationService } from './service/registration.service';
import { RegistrationGuard } from './guards/registration.guard';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    WidgitModule,
    UtilitiesModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ImageUploadModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent,
    RegistrationAvatarComponent,
    RegistrationInfoComponent,
    RegistrationComponent,
  ],
  declarations: [
    ProfileComponent,
    RegistrationAvatarComponent,
    RegistrationInfoComponent,
    RegistrationComponent,
  ],
  providers: [
    RegistrationService,
    RegistrationGuard
  ]
})
export class RegistrationModule { }
