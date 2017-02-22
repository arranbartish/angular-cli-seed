import { Component, OnInit } from '@angular/core';
import {Car} from "../../car/domain/car";
import {CarService} from "../../car/service/car.service";
import {SearchOptions} from "../../widgit/search-form/search-options";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  carList : Car[];
  errorMessage : string;
  private searchOptions : SearchOptions;

  constructor(private carService: CarService) {

  }

  ngOnInit() {
    this.searchOptions = {
      name: 'cars',
      target: './search'
    };

    this.carService.getCars()
      .subscribe(
        cars => this.carList = cars,
        error =>  this.errorMessage = <any>error);

  }

}
