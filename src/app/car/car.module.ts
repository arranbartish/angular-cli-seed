import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarListComponent} from './components/list/car-list.component';
import {CarService} from './service/car.service';
import {ListingComponent} from './containers/listing/listing.component';
import {SearchResultComponent} from './containers/search-result/search-result.component';
import {UtilitiesModule} from '../utilities/utilities.module';
import {AddComponent} from './components/add/add.component';
import {CarsListedGuard} from './guards/car-listing';
import {EffectsModule} from '@ngrx/effects';
import {CarEffects} from './effects/cars.';
import {WidgetModule} from 'arranbartish-angular-cli-widgets';

// const routes: Routes = [
//   { path: 'home', component: ListingComponent },
//   { path: 'search', component: SearchResultComponent }
// ];

@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    UtilitiesModule,
    NgbModule
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
