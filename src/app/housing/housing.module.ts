import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'arranbartish-angular-cli-widgets';

import { UtilitiesModule } from 'app/utilities/utilities.module';
import { HouseListComponent } from './components/list/house-list.component';
import { HouseEditComponent } from './components/edit/house-edit.component';
import { ListingComponent } from './containers/listing/listing.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { HousesListedGuard } from './guards/house-listing';
import { HousesLazyMenuGuard } from './guards/house-lazy-menu';
import { HouseService } from './service/house.service';

@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    UtilitiesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HouseListComponent,
    HouseEditComponent,
    ListingComponent,
    SearchResultComponent
  ],
  declarations: [
    HouseListComponent,
    HouseEditComponent,
    ListingComponent,
    SearchResultComponent
  ],
  providers: [
    HouseService,
    HousesListedGuard,
    HousesLazyMenuGuard
  ]
})
export class HousingModule {
}
