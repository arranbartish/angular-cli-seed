import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { House } from '../domain/housing';
import { HouseService } from '../service/house.service';
import { ActionFactory, HousingAction } from '../actions/housing';

@Injectable()
export class HousingEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(HousingAction.SEARCH)
    .map(toPayload)
    .switchMap(searchTerm => this.performSearch(searchTerm));

  @Effect()
  addHouse$: Observable<Action> = this.actions$
    .ofType(HousingAction.ADD_HOUSE)
    .map(toPayload)
    .switchMap(newHouse => this.performAddHouse(newHouse));

  constructor(private actions$: Actions, private houseService: HouseService) {
  }

  private performSearch(searchTerm: string): Observable<any> {
    if (searchTerm === '') {
      return of(ActionFactory.clearHouses());
      // TODO: implement the Toast-ing mechanism!
    }

    const nextSearch$ = this.actions$
      .ofType(HousingAction.SEARCH)
      .skip(1);

    return this.houseService.findHouses(searchTerm)
      .takeUntil(nextSearch$)
      .map(result => ActionFactory.searchComplete(result))
      .catch(error => {
        return of(ActionFactory.clearHouses());
        // TODO: implement the Toast-ing mechanism!
      });
  }

  private performAddHouse(newHouse: House): Observable<Action> {
    return this.houseService.addHouse(newHouse)
      .map(result => {
        // TODO: implement the Toast-ing mechanism!
        return result;
      })
      .switchMap(newHouse => this.houseService.getHouses())
      .map(houseList => ActionFactory.listHouses(houseList))
      .catch(err => {
        // TODO: implement the Toast-ing mechanism!
        return of({ type: 'Some random string', payload: 'Nothing to do!' } as Action);
      });
  }
}
