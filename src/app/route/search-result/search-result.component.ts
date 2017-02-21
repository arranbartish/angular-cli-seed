import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Car} from "../../car/domain/car";
import {CarService} from "../../car/service/car.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private term : string;
  private searchResults: Car[];
  private errorMessage: string;
  private target:string;

  constructor(private route: ActivatedRoute, private carService: CarService) { }

  ngOnInit() {
    this.target = './search';


    let param : Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || 'None');

    param.subscribe(
      q => this.term = q,
      error =>  this.term = <any>error /*should toast*/);

    if(!!this.term) {
      this.carService.findCars(this.term)
        .subscribe(
          cars => this.searchResults = cars,
          error =>  this.errorMessage = <any>error /*should toast*/);
    }

  }

}
