import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HousesState } from '../domain/housing';
import { HouseService } from '../service/house.service';
import { ActionFactory } from '../actions/housing';

@Injectable()
export class HousesListedGuard implements CanActivate {

  constructor(private store: Store<HousesState>,
              private houseService: HouseService) {
  }

  houseListingRefreshed(): Observable<boolean> {
    return this.houseService.getHouses()
      .do(houses => this.store.dispatch(ActionFactory.listHouses(houses)))
      .map(houses => !!houses);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.houseListingRefreshed();
  }
}
