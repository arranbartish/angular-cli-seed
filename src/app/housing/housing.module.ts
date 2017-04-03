import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HouseListComponent} from './components/list/house-list.component';
import {HouseEditComponent} from './components/edit/house-edit.component';
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
    NgbModule,
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
  providers: [HouseService, HousesListedGuard]
})
export class HousingModule { }
