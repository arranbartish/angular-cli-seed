import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Car} from '../domain/car';
import {Response, Http} from '@angular/http';

@Injectable()
export class CarService {

  constructor(private http: Http) {
  }

  findCars(term: string): Observable<Car[]> {
    return this.getFromUrl('/assets/mock/search/cars.json?q=' + term);
  }

  getCars(): Observable<Car[]> {
    return this.getFromUrl('/assets/mock/list/cars.json');
  }

  private getFromUrl(url: string): Observable<Car[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
