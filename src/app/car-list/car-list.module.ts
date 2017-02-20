import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './car-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CarListComponent
  ],
  declarations: [CarListComponent]
})
export class CarListModule { }
