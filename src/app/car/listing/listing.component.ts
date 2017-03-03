import { Component, OnInit } from '@angular/core';
import {Car, CarState} from '../domain/car';
import {CarService} from '../service/car.service';
import {SearchOptions} from '../../widgit/search-form/search-options';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.scss']
})
export class ListingComponent implements OnInit {
  carList: Car[];
  searchOptions: SearchOptions;

  constructor(private carService: CarService, private carStore: Store<CarState>) {}

  ngOnInit() {
    this.searchOptions = {
      name: 'cars',
      target: './search',
      store: this.carStore
    };

    this.carStore.select(state => state.cars).subscribe(cars => this.carList = cars);
  }

}
