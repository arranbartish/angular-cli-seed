import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HouseListComponent} from './components/list/house-list.component';
import {ListingComponent} from './containers/listing/listing.component';
import {SearchResultComponent} from './containers/search-result/search-result.component';
import {WidgitModule} from '../widgit/widgit.module';
import {UtilitiesModule} from '../utilities/utilities.module';
import {HousesListedGuard} from './guards/house-listing';
import {HouseService} from './service/house.service';

// const routes: Routes = [
//   { path: 'home', component: ListingComponent },
//   { path: 'search', component: SearchResultComponent }
// ];

@NgModule({
  imports: [
    CommonModule,
    WidgitModule,
    UtilitiesModule,
    NgbModule
  ],
  exports: [
    HouseListComponent,
    ListingComponent,
    SearchResultComponent
  ],
  declarations: [HouseListComponent, ListingComponent, SearchResultComponent],
  providers: [HouseService, HousesListedGuard]
})
export class HousingModule { }
