import 'rxjs/add/operator/map';
import {Response, Http} from '@angular/http';
import {Store} from '@ngrx/store';
import {ActionFactory} from '../actions/cars';
import {Injectable} from '@angular/core';
import {CarState} from '../domain/car';

@Injectable()
export class CarService {

  constructor(private http: Http, private _store: Store<CarState>) {
    this._store.select(state => state.term).subscribe(term => this.findCars(term));
    this.getCars();
  }

  findCars(term: string) {
    if (term && term.trim().length) {
      this.getFromUrl('/assets/mock/search/cars.json?q=' + term);
    }
  }

  getCars() {
    this.getFromUrl('/assets/mock/list/cars.json');
  }

  private getFromUrl(url: string) {

    this.http.get(url)
      .map((res: Response) => ActionFactory.listCars(res.json() || []))
      .subscribe(action => this._store.dispatch(action));
  }
}
