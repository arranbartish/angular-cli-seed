import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private term : string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    let param : Observable<string> = this.route
      .queryParams
      .map(params => params['q'] || 'None');

    param.subscribe(
      q => this.term = q,
      error =>  this.term = <any>error /*should toast*/);
  }

}
