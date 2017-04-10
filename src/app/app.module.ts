import { registration } from './registration/reducers/registration.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { WidgitModule } from './widgit/widgit.module';
import { CarRouteModule } from './car/car.route';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/pageNotFound.component';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { cars } from './car/reducers/car.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CarEffects } from './car/effects/cars.';
import { HousingRouteModule } from './housing/housing.route';
import { houses } from './housing/reducers/houses.reducer';
import { HousingEffects } from 'app/housing/effects/housing';
import { RegistrationModule } from './registration/registration.module';
import { RegistrationEffects } from './registration/effects/registration';
import { RegistrationRouteModule } from './registration/registration.route';
import { ImageUploadModule } from 'angular2-image-upload';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', loadChildren: './registration/registration.route#RegistrationRouteModule' },
  { path: 'car', loadChildren: './car/car.route#CarRouteModule' },
  { path: 'housing', loadChildren: './housing/housing.route#HousingRouteModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    RegistrationModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    CarRouteModule,
    HousingRouteModule,
    RegistrationRouteModule,
    WidgitModule,
    NgbModule.forRoot(),
    StoreModule.provideStore({ cars, houses, registration }),
    EffectsModule.run(CarEffects),
    EffectsModule.run(HousingEffects),
    EffectsModule.run(RegistrationEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
