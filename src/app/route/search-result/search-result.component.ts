import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Car} from "../../car-service/car";
import {CarSearchService} from "../../car-search/car-search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private term : string;
  private searchResults: Car[];
  private errorMessage: string;

  constructor(private route: ActivatedRoute, private carSearchService: CarSearchService) { }

  ngOnInit() {

    let param : Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || 'None');

    param.subscribe(
      q => this.term = q,
      error =>  this.term = <any>error /*should toast*/);

    if(!!this.term) {
      this.carSearchService.find(this.term)
        .subscribe(
          cars => this.searchResults = cars,
          error =>  this.errorMessage = <any>error /*should toast*/);
    }

  }

}
