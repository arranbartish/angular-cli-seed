import {Injectable, state} from '@angular/core';
import {Observable} from 'rxjs';
import {Car, CarAction, CarState} from '../domain/car';
import {Response, Http} from '@angular/http';
import {Store} from '@ngrx/store';

@Injectable()
export class CarService {

  constructor(private http: Http, private _store: Store<CarState>) {
  }

  findCars(term: string) {
    this.getFromUrl('/assets/mock/search/cars.json?q=' + term);
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

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
