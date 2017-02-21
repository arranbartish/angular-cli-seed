import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form/search-form.component';
import { CarSearchService } from "./car-search.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchFormComponent
  ],
  declarations: [SearchFormComponent],
  providers: [CarSearchService]
})
export class CarSearchModule { }
