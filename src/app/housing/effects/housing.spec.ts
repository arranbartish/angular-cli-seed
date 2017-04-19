import { inject, TestBed, fakeAsync } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { expect } from 'chai';
import { of } from 'rxjs/observable/of';
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

  const mockResponse: House[] = [
    {
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      construction: '1990',
      rooms: 3
    }
  ];

  const newHouse: House = {
    country: 'United States of America',
    state: 'Orange County',
    city: 'Irvine',
    construction: '1960',
    rooms: 4
  };

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
            addHouse = sinon.stub();
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
    (mockHouseService.findHouses as sinon.SinonStub).returns(of<House[]>([]));
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

  describe('When a Search action is triggered', () => {

    it('will return a different action (from SEARCH to LIST_HOUSES)', fakeAsync(() => {
      (mockHouseService.findHouses as sinon.SinonStub).returns(of<House[]>([]));
      executor.queue({ type: HousingAction.SEARCH });
      effect.search.subscribe(result => {
        expect(result.type).to.equal(HousingAction.LIST_HOUSES.toString());
      });
    }));

    it('will return an empty search result by calling house service', fakeAsync(() => {
      (mockHouseService.findHouses as sinon.SinonStub).returns(of<House[]>([]));
      executor.queue(ActionFactory.search('Melbourne'));
      effect.search.subscribe(result => {
        expect(result.payload.length).to.equal(0);
      });
    }));

    it('will return a filled result', fakeAsync(() => {
      (mockHouseService.findHouses as sinon.SinonStub).returns(of(mockResponse));
      executor.queue(ActionFactory.search('Sydney'));
      effect.search.subscribe(result => {
        expect(result.payload).to.eql(mockResponse);
      });
    }));

    it('will return empty result when no search term provided', fakeAsync(() => {
      executor.queue(ActionFactory.search(''));
      effect.search.subscribe((result) => {
        expect(result.payload.length).to.equal(0);
      });
    }));

    it('will toast a message when no search term provided', fakeAsync(() => {
      const toastMessage = 'Reseting search results.';

      executor.queue(ActionFactory.search(''));
      effect.search.subscribe((result) => {
        expect((mockToaster.info as sinon.SinonStub).calledWithExactly(toastMessage)).to.be.true;
      });
    }));

    it('will gracefully handle an error that occurred in houseService.findHouses', fakeAsync(() => {
      (mockHouseService.findHouses as sinon.SinonStub).returns(_throw('ka-BOOM!'));
      const toastMessage = 'Something went horribly wrong while searching for "let\'s break things!".';

      /* tslint:disable-next-line:quotemark */
      executor.queue(ActionFactory.search("let's break things!"));
      effect.search.subscribe((result) => {
        expect(result.payload.length).to.equal(0);
        expect((mockToaster.error as sinon.SinonStub).calledWithExactly(toastMessage)).to.be.true;
      });
    }));

  });

  describe('When a AddHouse action is triggered', () => {

    it('will return a different action (from ADD_HOUSE to LIST_HOUSES)', fakeAsync(() => {
      (mockHouseService.addHouse as sinon.SinonStub).returns(of(newHouse));
      (mockHouseService.getHouses as sinon.SinonStub).returns(of([...mockResponse, newHouse]));

      executor.queue({ type: HousingAction.ADD_HOUSE });
      effect.addHouse.subscribe(result => {
        expect(result.type).to.equal(HousingAction.LIST_HOUSES.toString());
      });
    }));

    it('will return list of House when done adding the new record', fakeAsync(() => {
      const returnValue: House[] = [...mockResponse, newHouse];
      (mockHouseService.addHouse as sinon.SinonStub).returns(of(newHouse));
      (mockHouseService.getHouses as sinon.SinonStub).returns(of(returnValue));

      executor.queue(ActionFactory.addHouse(newHouse));
      effect.addHouse.subscribe((result) => {
        expect(result.payload.length).to.equal(returnValue.length);
        expect((mockHouseService.addHouse as sinon.SinonStub).calledWithExactly(newHouse)).to.be.true;
        expect((mockHouseService.getHouses as sinon.SinonStub).called).to.be.true;
      });
    }));

    it('will toast a success message when done adding the new record', fakeAsync(() => {
      const returnValue: House[] = [...mockResponse, newHouse];
      const toastMessage = 'The new house has successfully been added!';
      (mockHouseService.addHouse as sinon.SinonStub).returns(of(newHouse));
      (mockHouseService.getHouses as sinon.SinonStub).returns(of(returnValue));

      executor.queue(ActionFactory.addHouse(newHouse));
      effect.addHouse.subscribe((result) => {
        expect((mockToaster.success as sinon.SinonStub).calledWithExactly(toastMessage)).to.be.true;
        expect((mockToaster.error as sinon.SinonStub).neverCalledWithMatch('.*')).to.be.true;
      });
    }));

    it('will gracefully handle an error that occurred in houseService.addHouse', fakeAsync(() => {
      (mockHouseService.addHouse as sinon.SinonStub).returns(_throw('ka-BOOM!'));
      const toastMessage = 'Something went horribly wrong while trying to add a new house...';

      executor.queue(ActionFactory.addHouse(newHouse));
      effect.addHouse.subscribe((result) => {
        expect(result.type).to.equal('Error while adding a new House');
        expect(result.payload).to.equal('.');
        expect((mockToaster.success as sinon.SinonStub).neverCalledWithMatch('.*')).to.be.true;
        expect((mockToaster.error as sinon.SinonStub).calledWithExactly(toastMessage)).to.be.true;
      });
    }));

  });

});
