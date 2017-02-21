import { Component, OnInit } from '@angular/core';
import {Car} from "../../car-service/car";
import {CarService} from "../../car-service/car-service.service";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  carList : Car[];

  constructor(private carService: CarService) {

  }

  ngOnInit() {

    //let otherCarList = this.carService.getData();
    //debugger;
    this.carList = [
      {
        brand: 'Toyota',
        model: 'Camery',
        year: '2011',
        condition: 'Excellent'
      }, {
        brand: 'Ford',
        model: 'Highlux',
        year: '2009',
        condition: 'Poor'
      }
    ];



  }

}
