import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarListComponent} from './list/car-list.component';
import {CarService} from './service/car.service';
import {ListingComponent} from './listing/listing.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {WidgitModule} from '../widgit/widgit.module';
import {UtilitiesModule} from '../utilities/utilities.module';
// import {RouterModule, Routes} from '@angular/router';
import { AddComponent } from './add/add.component';

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
    CarListComponent,
    ListingComponent,
    SearchResultComponent
  ],
  declarations: [CarListComponent, ListingComponent, SearchResultComponent, AddComponent],
  providers: [CarService]
})
export class CarModule { }
