import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './car-service.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  ],
  declarations: [],
  providers: [CarService]
})
export class CarServiceModule { }
