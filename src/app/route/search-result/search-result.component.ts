import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Car} from "../../car-service/car";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private term : string;
  private searchResults: Car[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    let param : Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || 'None');

    param.subscribe(
      q => this.term = q,
      error =>  this.term = <any>error /*should toast*/);

    this.searchResults = [
      {
        "brand": "Mercedes-Benz",
        "model": "CLA",
        "year": "2017",
        "condition": "Awesome"
      }, {
        "brand": "Aston Martin",
        "model": "AM-RB 001",
        "year": "2017",
        "condition": "Amazing"
      }
    ];
  }

}
