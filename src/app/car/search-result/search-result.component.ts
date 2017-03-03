import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Car, CarState} from '../domain/car';
import {CarService} from '../service/car.service';
import {SearchFormService} from '../../widgit/search-form/search-form.service';
import {SearchEvent} from '../../widgit/search-form/search-event';
import {SearchOptions} from '../../widgit/search-form/search-options';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  term: string;
  searchResults: Car[];
  searchOptions: SearchOptions;

  constructor(private route: ActivatedRoute,
              private carService: CarService,
              private searchFormService: SearchFormService,
              private _carStore: Store<CarState>) { }

  ngOnInit() {

    this.searchOptions = {
      name : 'cars',
      target : './search'
    };

    this._carStore.select(state => state.cars).subscribe(cars => this.searchResults = cars);

    const param: Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || '');

    param.subscribe(
      q => this.term = q,
      error =>  this.term = <any>error /*should toast*/);

    if (!!this.term) {
      this.refreshSearchResults(this.term);
    }

    const me = this;
    function handleEvent(event: SearchEvent) {
      me.refreshSearchResultsOnEvent(event);
    }
    this.searchFormService.registerMe(handleEvent);

  }

  refreshSearchResultsOnEvent(event: SearchEvent) {
    if (event.name === this.searchOptions.name) {
      this.refreshSearchResults(event.term);
    }
  }

  private refreshSearchResults(searchTerm: string) {
    this.carService.findCars(searchTerm);
  }
}
