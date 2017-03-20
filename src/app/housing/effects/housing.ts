
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { HouseService } from '../service/house.service';
import {ActionFactory, HousingAction} from '../actions/housing';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class HousingEffects {

  constructor(private actions$: Actions, private houseService: HouseService) { }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(HousingAction.SEARCH)
    .map(toPayload)
    .switchMap(searchTerm => {
      if (searchTerm === '') {
        return of(ActionFactory.clearHouses());
      }

      const nextSearch$ = this.actions$.ofType(HousingAction.SEARCH).skip(1);

      return this.houseService.findHouses(searchTerm)
        .takeUntil(nextSearch$)
        .map(result => ActionFactory.searchComplete(result))
        .catch(error => {
          return of(ActionFactory.clearHouses());
        });
  });

}
