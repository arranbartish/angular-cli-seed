import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {SearchFormService} from './search-form/search-form.service';
import {UtilitiesModule} from '../utilities/utilities.module';
import {SearchFormComponent} from './search-form/search-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationItemComponent } from './navigation/navigation-item.component';

@NgModule({
  imports: [
    CommonModule,
    UtilitiesModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchFormComponent,
    NavigationComponent,
    NavigationItemComponent
  ],
  declarations: [
    SearchFormComponent,
    NavigationComponent,
    NavigationItemComponent
  ],
  providers: [
    SearchFormService
  ]
})
export class WidgitModule { }
