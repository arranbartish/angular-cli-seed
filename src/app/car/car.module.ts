import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarListComponent} from './components/list/car-list.component';
import {CarService} from './service/car.service';
import {ListingComponent} from './containers/listing/listing.component';
import {SearchResultComponent} from './containers/search-result/search-result.component';
import {UtilitiesModule} from '../utilities/utilities.module';
import {AddComponent} from './components/add/add.component';
import {CarsListedGuard} from './guards/car-listing';
import {WidgetModule} from 'arranbartish-angular-cli-widgets';


@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    UtilitiesModule
  ],
  exports: [
    CarListComponent,
    ListingComponent,
    SearchResultComponent
  ],
  declarations: [CarListComponent, ListingComponent, SearchResultComponent, AddComponent],
  providers: [CarService, CarsListedGuard]
})
export class CarModule { }
