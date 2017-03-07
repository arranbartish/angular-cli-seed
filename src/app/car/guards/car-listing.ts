import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {CarState, Car} from '../domain/car';
import {CarService} from '../service/car.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import {ActionFactory} from '../actions/cars';

@Injectable()
export class CarsListedGuard implements CanActivate {

  constructor(private store: Store<CarState>,
              private carService: CarService) {
  }

  carListingRefreshed(): Observable<boolean> {
    return this.carService.getCars()
      .do(cars => this.store.dispatch(ActionFactory.listCars(cars)))
      .map(cars => !!cars);

  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.carListingRefreshed();
  }
}
