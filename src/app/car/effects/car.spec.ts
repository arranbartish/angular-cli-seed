import {inject, TestBed} from '@angular/core/testing';
import {Car, CarState} from '../domain/car';
import {CarModule} from '../car.module';
import {CarService} from '../service/car.service';
import {StoreModule, Store} from '@ngrx/store';
import {cars} from '../reducers/car.reducer';
import {ActionFactory} from '../actions/cars';
import {Observable, BehaviorSubject} from 'rxjs';
import {CarEffects} from './cars.';
import {EffectsTestingModule} from '@ngrx/effects/testing';


describe('CarEffects', () => {

  let mockCarService: CarService;
  let effect: CarEffects;
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
      imports: [CarModule, EffectsTestingModule, StoreModule.provideStore({cars})],
      providers: [
        CarEffects,
        {
          provide: CarService,
          useClass: class {
            findCars(term: string): Observable<Car[]> { return new BehaviorSubject([]) }
            getCars(): Observable<Car[]> { return new BehaviorSubject([]) }
          }
        }
      ]
    });
  });

  beforeEach(inject([CarService, CarEffects, Store], (carService: CarService, carEffects: CarEffects, _store: Store<CarState>) => {
    mockCarService = carService;
    effect = carEffects;
    store = _store;
  }));

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

});
