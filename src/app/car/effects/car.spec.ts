import { inject, TestBed, async, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { Car, CarState } from '../domain/car';
import { CarModule } from '../car.module';
import { CarService } from '../service/car.service';
import { cars } from '../reducers/car.reducer';
import { ActionFactory, CarAction, ListCarsAction } from '../actions/cars';
import { CarEffects } from './cars';

describe('CarEffects', () => {

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
            findCars = sinon.stub();
            getCars = sinon.stub();
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
    (mockCarService.findCars as sinon.SinonStub).returns(new BehaviorSubject([]));
    store.select(state => state.cars).subscribe(carsList => subscribedCars = carsList);
    store.dispatch(ActionFactory.clearCars());
  });

  it('will always start with an empty store', () => {
    expect(subscribedCars).to.eql([]);
  });


  it('will be injected with the mock car service', () => {
    expect(mockCarService).to.exist;
  });

  it('will be able to get the effect to test', () => {
    expect(effect).to.exist;
  });

  it('will be injected with the store', () => {
    expect(store).to.exist;
  });

  it('will be injected with the effect executor', () => {
    expect(executor).to.exist;
  });

  it('will return same search action', fakeAsync(() => {
    (mockCarService.findCars as sinon.SinonStub).returns(new BehaviorSubject([]));
    executor.queue({ type: CarAction.SEARCH });
    effect.search$.subscribe(result => {
      expect(result.type).to.equal('Car - list cars');
    });
  }));

  it('will return an empty search result by calling car service', fakeAsync(() => {
    (mockCarService.findCars as sinon.SinonStub).returns(new BehaviorSubject([]));
    executor.queue(ActionFactory.search('Ford'));
    effect.search$.subscribe(result => {
      expect(result.payload.length).to.equal(0);
    });
  }));

  it('will return a filled result', fakeAsync(() => {
    (mockCarService.findCars as sinon.SinonStub).returns(new BehaviorSubject(mockResponse));
    executor.queue(ActionFactory.search('Toyota'));
    effect.search$.subscribe(result => {
      expect(result.payload).to.eql(mockResponse);
    });
  }));

  it('will return empty result when no search term provided', fakeAsync(() => {
    executor.queue(ActionFactory.search(''));
    effect.search$.subscribe((result) => {
      expect(result.payload.length).to.equal(0);
    });
  }));

});
