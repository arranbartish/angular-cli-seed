import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SearchFormComponent} from "./search-form/search-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchFormComponent
  ],
  declarations: [SearchFormComponent]
})
export class WidgitModule { }
