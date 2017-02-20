import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HelloWorldModule } from './hello-world/hello-world.module';

import { AppComponent } from './app.component';
import {CarListModule} from "./car-list/car-list.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HelloWorldModule,
    CarListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
