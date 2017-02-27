import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Car} from "../domain/car";
import {CarService} from "../service/car.service";
import {SearchFormService} from "../../widgit/search-form/search-form.service";
import {SearchEvent} from "../../widgit/search-form/search-event";
import {SearchOptions} from "../../widgit/search-form/search-options";

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  term : string;
  searchResults: Car[];
  errorMessage: string;
  searchOptions : SearchOptions;

  constructor(private route: ActivatedRoute, private carService: CarService, private searchFormService: SearchFormService) { }

  ngOnInit() {
    this.searchOptions = {
      name : 'cars',
      target : './search'
    };

    let param : Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || '');

    param.subscribe(
      q => this.term = q,
      error =>  this.term = <any>error /*should toast*/);

    if(!!this.term) {
      this.refreshSearchResults();
    }

    let me = this;
    function handleEvent(event: SearchEvent) {
      me.refreshSearchResultsOnEvent(event);
    }
    this.searchFormService.registerMe(handleEvent);

  }

  refreshSearchResultsOnEvent(event: SearchEvent) {
    if(event.name === this.searchOptions.name) {
      this.term = event.term;
      this.refreshSearchResults();
    }
  }

  private refreshSearchResults() {
    this.carService.findCars(this.term)
      .subscribe(
        cars => this.searchResults = cars,
        error =>  this.errorMessage = <any>error /*should toast*/);
  }
}
