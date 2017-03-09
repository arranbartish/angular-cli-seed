import { empty } from 'rxjs/observable/empty';
import { inject, TestBed, async, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Car, CarState } from '../domain/car';
import { CarModule } from '../car.module';
import { CarService } from '../service/car.service';
import { StoreModule, Store } from '@ngrx/store';
import { cars } from '../reducers/car.reducer';
import { ActionFactory, CarAction, ListCarsAction } from '../actions/cars';
import { Observable, BehaviorSubject } from 'rxjs';
import { CarEffects } from './cars.';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

fdescribe('CarEffects', () => {

  let mockCarService: CarService;
  let effect: CarEffects;
  let store: Store<CarState>;
  let subscribedCars: Car[];
  let executor: EffectsRunner;

  const mockResponse = [{
    brand: 'Toyota',
    model: 'Camery',
    year: '2011',
    condition: 'Awesome'
  }];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarModule, EffectsTestingModule, StoreModule.provideStore({ cars })],
      providers: [
        CarEffects,
        {
          provide: CarService,
          useClass: class {
            findCars(term: string): Observable<Car[]> { return new BehaviorSubject([]) };
            getCars(): Observable<Car[]> { return new BehaviorSubject([]) };
          }
        }
      ]
    });
  });

  beforeEach(fakeAsync(inject([CarService, CarEffects, Store, EffectsRunner], 
            (carService: CarService, carEffects: CarEffects, _store: Store<CarState>, _runner: EffectsRunner) => {
    mockCarService = carService;
    effect = carEffects;
    store = _store;
    executor = _runner;
  })));

  beforeEach(() => {
    store.select(state => state.cars).subscribe(carsList => subscribedCars = carsList);
    store.dispatch(ActionFactory.clearCars());
  });

  it('will always start with an empty store', () => {
    expect(subscribedCars).toEqual([]);
  });


  it('will be injected with the mock car service', () => {
    expect(mockCarService).toBeDefined();
  });

  it('will be able to get the effect to test', () => {
    expect(effect).toBeDefined();
  });

  it('will be injected with the store', () => {
    expect(store).toBeDefined();
  });

  it('will be injected with the effect executor', () => {
    expect(executor).toBeDefined();
  });

  it('will return same search action', (done) => {
    executor.queue({ type: CarAction.SEARCH });
    effect.search$.subscribe(result => {
      expect(result.type).toBe('Car - list cars');
      done();
    });
  });

  it('will return an empty search result by calling car service', (done) => {
    executor.queue({ type: CarAction.SEARCH, payload: 'Ford' });
    effect.search$.subscribe(result => {
      expect(result.payload.length).toBe(0);
      done();
    });
  });


  it('will return a filled result', (done) => {
    spyOn(mockCarService, 'findCars').and.returnValue(new BehaviorSubject(mockResponse));
    executor.queue({ type: CarAction.SEARCH, payload: 'Toyota' });
    effect.search$.subscribe(result => {
      expect(result.payload).toBe(mockResponse);
      done();
    });
  });


  it('will return empty result when no search term provided', (done) => {
    executor.queue({ type: CarAction.SEARCH, payload: '' });
    effect.search$.subscribe((result) => {
      expect(result.payload.length).toBe(0);
      done();
    });

  });

});
