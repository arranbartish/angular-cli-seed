import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CarModule } from './car.module';

const routes: Routes = [
  { path: 'car', redirectTo: '/car/overview', pathMatch: 'full' },
  { path: 'overview', component: ListingComponent },
  { path: 'search', component: SearchResultComponent }
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
