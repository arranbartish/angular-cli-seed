import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { ObjectService } from './object.service';
import { Toaster } from './Toaster';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot()
  ],
  declarations: [],
  providers: [ObjectService, Toaster]
})
export class UtilitiesModule { }
