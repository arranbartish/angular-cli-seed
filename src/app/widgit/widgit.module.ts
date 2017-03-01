import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchFormComponent} from './search-form/search-form.component';
import {SearchFormService} from './search-form/search-form.service';
import {UtilitiesModule} from '../utilities/utilities.module';


@NgModule({
  imports: [
    CommonModule,
    UtilitiesModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchFormComponent
  ],
  declarations: [SearchFormComponent],
  providers: [SearchFormService]
})
export class WidgitModule { }
