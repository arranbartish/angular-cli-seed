import {inject, TestBed, fakeAsync} from '@angular/core/testing';
import {House, HousesState} from '../domain/housing';
import {HousingModule} from '../housing.module';
import {HouseService} from '../service/house.service';
import {StoreModule, Store} from '@ngrx/store';
import {ActionFactory, HousingAction, ListHousesAction} from '../actions/housing';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HousingEffects} from './housing';
import {EffectsTestingModule, EffectsRunner} from '@ngrx/effects/testing';
import {expect} from 'chai';
import {houses} from '../reducers/houses.reducer';

describe('HousingEffects', () => {

  let mockHouseService: HouseService;
  let effect: HousingEffects;
  let store: Store<HousesState>;
  let subscribedHouses: House[];
  let executor: EffectsRunner;

  const mockResponse = [{
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    construction: '1990',
    rooms: 3
  }];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HousingModule, EffectsTestingModule, StoreModule.provideStore({ houses })],
      providers: [
        HousingEffects,
        {
          provide: HouseService,
          useClass: class {
            findHouses = sinon.stub();
            getHouses = sinon.stub();
          }
        }
      ]
    });
  });

  beforeEach(fakeAsync(inject([HouseService, HousingEffects, Store, EffectsRunner],
            (houseService: HouseService, housingEffects: HousingEffects, _store: Store<HousesState>, _runner: EffectsRunner) => {
    mockHouseService = houseService;
    effect = housingEffects;
    store = _store;
    executor = _runner;
  })));

  beforeEach(() => {
    (mockHouseService.findHouses as sinon.SinonStub).returns(new BehaviorSubject([]));
    store.select(state => state.houses).subscribe(housesList => subscribedHouses = housesList);
    store.dispatch(ActionFactory.clearHouses());
  });

  it('will always start with an empty store', () => {
    expect(subscribedHouses).to.eql([]);
  });


  it('will be injected with the mock house service', () => {
    expect(mockHouseService).to.exist;
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
    (mockHouseService.findHouses as sinon.SinonStub).returns(new BehaviorSubject([]));
    executor.queue({ type: HousingAction.SEARCH });
    effect.search$.subscribe(result => {
      expect(result.type).to.equal('House - list houses');
    });
  }));

  it('will return an empty search result by calling house service', fakeAsync(() => {
    (mockHouseService.findHouses as sinon.SinonStub).returns(new BehaviorSubject([]));
    executor.queue(ActionFactory.search('Melbourne'));
    effect.search$.subscribe(result => {
      expect(result.payload.length).to.equal(0);
    });
  }));

  it('will return a filled result', fakeAsync(() => {
    (mockHouseService.findHouses as sinon.SinonStub).returns(new BehaviorSubject(mockResponse));
    executor.queue(ActionFactory.search('Sydney'));
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
