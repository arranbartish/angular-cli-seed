import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Store } from '@ngrx/store';
import { CarState, Car } from '../../domain/car';
import { ActionFactory } from '../../actions/cars';
import * as _ from 'lodash';
import {SearchOptions} from 'arranbartish-angular-cli-widgets';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResults: Car[] = [];
  searchTerm: string;
  searchOptions: SearchOptions;

  constructor(private route: ActivatedRoute,
    private carStore: Store<CarState>) {}

  ngOnInit() {
    this.searchOptions = {
      name: 'cars',
      target: './search'
    };

    this.route
      .queryParams
      .map(params => params['q'] || '')
      .distinctUntilChanged()
      .subscribe(q => {
        this.termChanged(q);
      });

    this.carStore.select(state => state.cars).subscribe(cars => this.searchResults = cars);

    if (_.isEmpty(this.searchTerm)) {
      this.carStore.dispatch(ActionFactory.clearCars());
    }
  }

  termChanged(event) {
    this.setTerm(event);
  }

  setTerm(term: string) {
    if (!!term) {
      this.searchTerm = term;
      this.carStore.dispatch(ActionFactory.search(this.searchTerm));
    } else {
      return;
    }
  }
}
