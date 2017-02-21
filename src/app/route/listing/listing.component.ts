import { Component, OnInit } from '@angular/core';
import {Car} from "../../car/domain/car";
import {CarService} from "../../car/service/car.service";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  carList : Car[];
  errorMessage : string;
  private target:string;

  constructor(private carService: CarService) {

  }

  ngOnInit() {
    this.target = './search';

    this.carService.getData()
      .subscribe(
        cars => this.carList = cars,
        error =>  this.errorMessage = <any>error);

  }

}
