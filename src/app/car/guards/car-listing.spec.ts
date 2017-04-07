import { expect } from 'chai';
import {inject, TestBed} from '@angular/core/testing';
import {Car, CarState} from '../domain/car';
import {CarModule} from '../car.module';
import {CarService} from '../service/car.service';
import {CarsListedGuard} from './car-listing';
import {StoreModule, Store} from '@ngrx/store';
import {cars} from '../reducers/car.reducer';
import {ActionFactory} from '../actions/cars';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


describe('CarsListedGuard', () => {

  let mockCarService: CarService;
  let guard: CarsListedGuard;
  let store: Store<CarState>;
  let subscribedCars: Car[];

  const mockResponse = [{
    brand: 'Toyota',
    model: 'Camery',
    year: '2011',
    condition: 'Awesome'
  }];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarModule, StoreModule.provideStore({cars})],
      providers: [
        {
          provide: CarService,
          useClass: class {
            findCars = sinon.stub();
            getCars = sinon.stub();
          }
        }
      ]
    });
  });

  beforeEach(inject([CarService, CarsListedGuard, Store], (carService: CarService,
                                                           carsListedGuard: CarsListedGuard,
                                                           _store: Store<CarState>) => {
    mockCarService = carService;
    guard = carsListedGuard;
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.cars).subscribe(carsList => subscribedCars = carsList);
    store.dispatch(ActionFactory.clearCars());
  });


  it('will always start with an empty store', () => {
    expect(subscribedCars).to.eql([]);
  });

  describe('when response comes from service', () => {

    beforeEach(() => {
      (mockCarService.getCars as sinon.SinonStub).returns(new BehaviorSubject(mockResponse));
    });

    it('will ensure cars are updated', () => {
      guard.canActivate(null).subscribe();
      expect(subscribedCars).to.eql(mockResponse);
    });

    it('will allow activation', () => {
      let result: boolean;
      guard.canActivate(null).subscribe(value => result = value);
      expect(result).to.be.ok;
    });

  });

  describe('when no response comes from service', () => {

    beforeEach(() => {
      (mockCarService.getCars as sinon.SinonStub).returns(new BehaviorSubject([]));
    });

    it('will allow activation', () => {
      let result: boolean;
      guard.canActivate(null).subscribe(value => result = value);
      expect(result).to.be.ok;
    });
  });
});
