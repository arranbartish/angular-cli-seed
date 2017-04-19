import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { House } from '../domain/housing';
import { HouseService } from '../service/house.service';
import { ActionFactory, HousingAction } from '../actions/housing';
import { Toaster } from './../../utilities/Toaster';

@Injectable()
export class HousingEffects {

  @Effect()
  search: Observable<Action> = this.actions
    .ofType(HousingAction.SEARCH)
    .map(toPayload)
    .switchMap(searchTerm => this.performSearch(searchTerm));

  @Effect()
  addHouse: Observable<Action> = this.actions
    .ofType(HousingAction.ADD_HOUSE)
    .map(toPayload)
    .switchMap(newHouse => this.performAddHouse(newHouse));

  constructor(private actions: Actions, private houseService: HouseService, private toaster: Toaster) {
  }

  private performSearch(searchTerm: string): Observable<any> {
    if (searchTerm === '') {
      this.toaster.info('Reseting search results.');
      return of(ActionFactory.clearHouses());
    }

    const nextSearch = this.actions
      .ofType(HousingAction.SEARCH)
      .skip(1);

    return this.houseService.findHouses(searchTerm)
      .takeUntil(nextSearch)
      .map(result => ActionFactory.searchComplete(result))
      .catch((error, caught) => {
        this.toaster.error('Something went horribly wrong while searching for "' + searchTerm + '".');
        return of(ActionFactory.clearHouses());
      });
  }

  private performAddHouse(newHouse: House): Observable<Action> {
    return this.houseService.addHouse(newHouse)
      .map(result => {
        this.toaster.success('The new house has successfully been added!');
        return result;
      })
      .switchMap(house => this.houseService.getHouses())
      .map(houseList => ActionFactory.listHouses(houseList))
      .catch(err => {
        this.toaster.error('Something went horribly wrong while trying to add a new house...');
        return of({ type: 'Error while adding a new House', payload: '.' } as Action);
      });
  }
}
