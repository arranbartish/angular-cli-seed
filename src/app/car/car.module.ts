import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CarListComponent} from "./list/car-list.component";
import {SearchService} from "./service/search.service";
import {CarService} from "./service/car.service";


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    CarListComponent
  ],
  declarations: [CarListComponent],
  providers: [SearchService, CarService]
})
export class CarModule { }
