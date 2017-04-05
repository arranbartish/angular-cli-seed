import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {UtilitiesModule} from '../utilities/utilities.module';
import {SearchFormComponent} from './search-form/search-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationItemComponent } from './navigation/navigation-item.component';
import { AuthenticationModule } from './authentication/authentication.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationModule,
    UtilitiesModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    SearchFormComponent,
    NavigationComponent,
    NavigationItemComponent,
  ],
  declarations: [
    SearchFormComponent,
    NavigationComponent,
    NavigationItemComponent
  ]
})
export class WidgitModule { }
