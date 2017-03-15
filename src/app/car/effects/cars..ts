
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { CarService } from '../service/car.service';
import { CarAction, ActionFactory } from '../actions/cars';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class CarEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(CarAction.SEARCH)
    //.debounceTime(300)
    .map(toPayload)
    .switchMap(searchTerm => {
      if (searchTerm === '') {
        return of(ActionFactory.clearCars());
      }

      const nextSearch$ = this.actions$.ofType(CarAction.SEARCH).skip(1);

      return this.carService.findCars(searchTerm)
        .takeUntil(nextSearch$)
        .map(result => ActionFactory.searchComplete(result))
        .catch(error => {
          return of(ActionFactory.clearCars());
        });
  });

  constructor(private actions$: Actions, private carService: CarService) { }
}
