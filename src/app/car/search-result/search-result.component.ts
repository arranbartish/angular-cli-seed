import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Car, CarState} from '../domain/car';
import {SearchAction} from '../../widgit/search-form/domain/search-event';
import {SearchOptions} from '../../widgit/search-form/search-options';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResults: Car[];
  searchOptions: SearchOptions;

  constructor(private route: ActivatedRoute,
              private _carStore: Store<CarState>) { }

  ngOnInit() {

    this.searchOptions = {
      name : 'cars',
      target : './search',
      store: this._carStore
    };

    this._carStore.select(state => state.cars).subscribe(cars => this.searchResults = cars);

    const param: Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || '');

    param.subscribe(
      q => this._carStore.dispatch({
        type: SearchAction[SearchAction.CHANGE_TERM],
        payload: q
      }),
      error =>  console.log('nothing on query string')/*should toast*/);
  }

}
