import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HouseListComponent} from './components/list/house-list.component';
import {HouseEditComponent} from './components/edit/house-edit.component';
import {ListingComponent} from './containers/listing/listing.component';
import {SearchResultComponent} from './containers/search-result/search-result.component';
import {UtilitiesModule} from '../utilities/utilities.module';
import {HousesListedGuard} from './guards/house-listing';
import {HouseService} from './service/house.service';
import {WidgetModule} from 'arranbartish-angular-cli-widgets';


@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    UtilitiesModule,
    NgbModule,
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
    HousesListedGuard
  ]
})
export class HousingModule { }
