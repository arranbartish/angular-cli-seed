import { Component, OnInit, Input } from '@angular/core';
import {Car} from '../../domain/car';

@Component({
  selector: 'app-car-list',
  templateUrl: 'car-list.component.html',
  styleUrls: ['car-list.component.scss']
})
export class CarListComponent implements OnInit {

  @Input() public carList: Car[];

  constructor() { }

  ngOnInit() {
  }

}
