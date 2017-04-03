import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { House } from '../domain/housing';

@Injectable()
export class /*Fake*/HouseService {

  private dataSet: House[];

  constructor(private http: Http) {
    this.dataSet = [];
  }

  findHouses(term: string): Observable<House[]> {
    return this.getFromUrl('/assets/mock/search/houses.json?q=' + term);
  }

  getHouses(): Observable<House[]> {
    return this.getFromUrl('/assets/mock/list/houses.json')
      .switchMap(houseList => of([...houseList, ...this.dataSet]));
  }

  addHouse(newHouse: House): Observable<House> {
    this.dataSet = [...this.dataSet, newHouse];
    return of(newHouse); // TODO: implement actual service call!
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
