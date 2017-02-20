import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SayHelloComponent } from './say-hello/say-hello.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    SayHelloComponent
  ],
  declarations: [SayHelloComponent]
})
export class HelloWorldModule { }
