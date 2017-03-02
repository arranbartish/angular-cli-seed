import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {CarRouteModule} from './car/car.route';
import {StoreModule, ActionReducer, combineReducers} from '@ngrx/store';
import {cars} from './car/ngrx/car.reducer';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: './car/car.route#CarRouteModule' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    CarRouteModule,
    NgbModule.forRoot(),
    StoreModule.provideStore({cars})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
