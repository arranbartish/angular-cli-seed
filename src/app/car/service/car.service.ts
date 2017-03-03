import {Injectable, state} from '@angular/core';
import 'rxjs/add/operator/map';
import {Car, CarAction, CarState} from '../domain/car';
import {Response, Http} from '@angular/http';
import {Store} from '@ngrx/store';

@Injectable()
export class CarService {

  constructor(private http: Http, private _store: Store<CarState>) {
    this._store.select(state => state.term).subscribe(term => this.findCars(term));
  }

  findCars(term: string) {
    if(term && term.trim().length){
      this.getFromUrl('/assets/mock/search/cars.json?q=' + term);
    }
  }

  getCars() {
    this.getFromUrl('/assets/mock/list/cars.json');
  }

  private getFromUrl(url: string) {

    this.http.get(url)
      .map((res: Response) => (
        {
          type: CarAction[CarAction.SET_CARS],
          payload: res.json() || []
        }
      )).subscribe(action => this._store.dispatch(action));
  }
}
