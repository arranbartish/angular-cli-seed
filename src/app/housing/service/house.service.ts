import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Http} from '@angular/http';
import {House} from '../domain/housing';


@Injectable()
export class HouseService {

  constructor(private http: Http) {
  }

  findHouses(term: string): Observable<House[]> {
    return this.getFromUrl('/assets/mock/search/houses.json?q=' + term);
  }

  getHouses(): Observable<House[]> {
    return this.getFromUrl('/assets/mock/list/houses.json');
  }

  private getFromUrl(url: string): Observable<House[]> {
    return this.http.get(url)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }

}
