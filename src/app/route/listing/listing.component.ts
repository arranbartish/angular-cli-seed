import { Component, OnInit } from '@angular/core';
import {Car} from "../../car-service/car";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  carList : Car[];

  constructor() { }

  ngOnInit() {
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
