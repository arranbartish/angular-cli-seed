import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionFactory } from '../../actions/housing';
import { House, HousesState } from '../../domain/housing';
import {SearchOptions} from 'arranbartish-angular-cli-widgets';

@Component({
  selector: 'app-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.scss']
})
export class ListingComponent implements OnInit {

  houseList: House[];

  searchOptions: SearchOptions;

  constructor(private housingStore: Store<HousesState>) {
  }

  ngOnInit() {
    this.searchOptions = {
      name: 'houses',
      target: './search'
    };

    this.housingStore.select(state => state.houses).subscribe(houses => this.houseList = houses);
  }

  public houseCreated(newHouse: House) {
    this.housingStore.dispatch(ActionFactory.addHouse(newHouse));
  }

}
