import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Car, CarState} from '../../domain/car';
import {SearchOptions} from 'arranbartish-angular-cli-widgets';

@Component({
  selector: 'app-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.scss']
})
export class ListingComponent implements OnInit {
  carList: Car[];
  searchOptions: SearchOptions;

  constructor(private carStore: Store<CarState>) {}

  ngOnInit() {

    this.searchOptions = {
      name: 'cars',
      target: './search'
    };

    this.carStore.select(state => state.cars).subscribe(cars => this.carList = cars);
  }

}
