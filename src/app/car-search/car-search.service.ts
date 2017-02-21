import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Car} from "../car-service/car";
import {Response, Http} from "@angular/http";

@Injectable()
export class CarSearchService {

  constructor(private http:Http) { }

  find(term: string):Observable<Car[]> {
    return this.http.get('/assets/search/cars.json?q='+term)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
