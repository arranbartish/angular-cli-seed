import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './containers/listing/listing.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { CarModule } from './car.module';
import {CarsListedGuard} from './guards/car-listing';
import {EffectsModule} from '@ngrx/effects';
import {CarEffects} from './effects/cars';

const routes: Routes = [
  {
    path: 'car',
    redirectTo: '/car/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    canActivate: [ CarsListedGuard ],
    component: ListingComponent
  },
  {
    path: 'search',
    component: SearchResultComponent
  }
];

@NgModule({
  exports: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CarModule,
    CommonModule
  ], declarations: []
})
export class CarRouteModule { }
