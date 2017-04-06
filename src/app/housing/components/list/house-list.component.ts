import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { House } from '../../domain/housing';

@Component({
  selector: 'app-house-list',
  templateUrl: 'house-list.component.html',
  styleUrls: ['house-list.component.scss']
})
export class HouseListComponent implements OnInit {

  @Input()
  public houseList: House[];

  constructor() {
  }

  ngOnInit() {
  }

}
