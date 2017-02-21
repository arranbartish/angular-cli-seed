import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CarListComponent} from "./list/car-list.component";
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
  providers: [CarService]
})
export class CarModule { }
