import { inject, TestBed, fakeAsync } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { _throw } from 'rxjs/observable/throw';

import { House, HousesState } from '../domain/housing';
import { HousingModule } from '../housing.module';
import { HouseService } from '../service/house.service';
import { ActionFactory, HousingAction, ListHousesAction } from '../actions/housing';
import { HousingEffects } from './housing';
import { houses } from '../reducers/houses.reducer';
import { Toaster } from 'app/utilities/Toaster';

describe('HousingEffects', () => {

  let mockHouseService: HouseService;
  let mockToaster: Toaster;
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
        },
        {
          provide: Toaster,
          useClass: class {
            info = sinon.stub();
            success = sinon.stub();
            error = sinon.stub();
          }
        }
      ]
    });
  });

  beforeEach(fakeAsync(inject([HouseService, Toaster, HousingEffects, Store, EffectsRunner],
            (houseService: HouseService, toaster: Toaster, housingEffects: HousingEffects,
             _store: Store<HousesState>, _runner: EffectsRunner) => {
      mockHouseService = houseService;
      mockToaster = toaster;
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

  it('will be injected with the mock toaster', () => {
    expect(mockToaster).to.exist;
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
    const toastMessage = 'Reseting search results.';

    executor.queue(ActionFactory.search(''));
    effect.search$.subscribe((result) => {
      expect(result.payload.length).to.equal(0);
      expect((mockToaster.info as sinon.SinonStub).calledWithExactly(toastMessage)).to.be.true;
    });
  }));

  it('will gracefully handle an error that occurred in the house service', fakeAsync(() => {
    (mockHouseService.findHouses as sinon.SinonStub).returns(_throw('ka-BOOM!'));
    const searchTerm = 'needle';
    const toastMessage = 'Something went horribly wrong while searching for "needle".';

    executor.queue(ActionFactory.search(searchTerm));
    effect.search$.subscribe((result) => {
      expect(result.payload.length).to.equal(0);
      expect((mockToaster.error as sinon.SinonStub).calledWithExactly(toastMessage)).to.be.true;
    });
  }));

});
