import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CarModule } from './car.module';
import { ListingComponent } from './containers/listing/listing.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { CarEffects } from './effects/cars';
import { CarsLazyMenuGuard } from './guards/car-lazy-menu';
import { CarsListedGuard } from './guards/car-listing';

const routes: Routes = [
  {
    path: 'car',
    redirectTo: '/car/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    canActivate: [CarsListedGuard, CarsLazyMenuGuard],
    component: ListingComponent
  },
  {
    path: 'search',
    canActivate: [CarsLazyMenuGuard],
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
