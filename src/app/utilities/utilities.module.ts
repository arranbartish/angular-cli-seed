import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectService } from './object.service';
import { Toaster } from './Toaster';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ObjectService, Toaster]
})
export class UtilitiesModule { }
