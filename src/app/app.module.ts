import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { WidgitModule } from './widgit/widgit.module';
import { CarRouteModule } from './car/car.route';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/pageNotFound.component';
import {StoreModule, ActionReducer, combineReducers} from '@ngrx/store';
import {cars} from './car/reducers/car.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CarEffects} from './car/effects/cars.';
import {HousingRouteModule} from './housing/housing.route';
import {houses} from './housing/reducers/houses.reducer';
import {HousingEffects} from 'app/housing/effects/housing';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'car', loadChildren: './car/car.route#CarRouteModule' },
  { path: 'housing', loadChildren: './housing/housing.route#HousingRouteModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    CarRouteModule,
    HousingRouteModule,
    WidgitModule,
    NgbModule.forRoot(),
    StoreModule.provideStore({cars, houses}),
    EffectsModule.run(CarEffects),
    EffectsModule.run(HousingEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
