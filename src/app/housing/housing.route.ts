import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './containers/listing/listing.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { HousingModule } from './housing.module';
import {HousesListedGuard} from './guards/house-listing';
import { HousesLazyMenuGuard } from './guards/house-lazy-menu';

const routes: Routes = [
  {
    path: 'housing',
    redirectTo: '/housing/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    canActivate: [ HousesListedGuard, HousesLazyMenuGuard ],
    component: ListingComponent
  },
  {
    path: 'search',
    canActivate: [ HousesLazyMenuGuard ],
    component: SearchResultComponent
  }
];

@NgModule({
  exports: [
  ],
  imports: [
    RouterModule.forChild(routes),
    HousingModule,
    CommonModule
  ], declarations: []
})
export class HousingRouteModule { }
