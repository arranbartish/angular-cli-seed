import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-list',
  templateUrl: 'car-list.component.html',
  styleUrls: ['car-list.component.scss']
})
export class CarListComponent implements OnInit {

  carList = [];

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
