import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Store} from '@ngrx/store';
import {House, HousesState} from '../../domain/housing';
import {ActionFactory} from '../../actions/housing';
import {SearchOptions} from 'arranbartish-angular-cli-widgets';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResults: House[];
  searchTerm: string;
  searchOptions: SearchOptions;

  constructor(private route: ActivatedRoute,
    private houseStore: Store<HousesState>) {}

  ngOnInit() {
    this.searchResults = [];
    this.searchOptions = {
      name: 'houses',
      target: './search'
    };

    this.route
      .queryParams
      .map(params => params['q'] || '')
      .distinctUntilChanged()
      .subscribe(q => {
        this.setTerm(q);
      });
  }

  termChanged(event) {
    this.setTerm(event);
  }

  setTerm(term: string) {
    if (!!term) {
      this.searchTerm = term;
      this.houseStore.dispatch(ActionFactory.search(this.searchTerm));
      this.houseStore.select(state => state.houses).subscribe(houses => this.searchResults = houses);
    } else {
      return;
    }
  }
}
