import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './car-service.service';
//import {Car} from "./car";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CarService
    //,  Car
  ],
  declarations: [],
  providers: [CarService]
})
export class CarServiceModule { }
