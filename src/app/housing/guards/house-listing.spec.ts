import {inject, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HouseService} from '../service/house.service';
import {House, HousesState} from '../domain/housing';
import {HousingModule} from '../housing.module';
import {HousesListedGuard} from './house-listing';
import {ActionFactory} from '../actions/housing';
import {houses} from '../reducers/houses.reducer';
import {expect} from 'chai';


describe('HousesListedGuard', () => {

  let mockHouseService: HouseService;
  let guard: HousesListedGuard;
  let store: Store<HousesState>;
  let subscribedHouses: House[];

  const mockResponse: House[] = [{
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    construction: '1990',
    rooms: 3
  }];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HousingModule, StoreModule.provideStore({houses})],
      providers: [
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

  beforeEach(inject([HouseService, HousesListedGuard, Store], (houseService: HouseService,
                                                               housesListedGuard: HousesListedGuard,
                                                               _store: Store<HousesState>) => {
    mockHouseService = houseService;
    guard = housesListedGuard;
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.houses).subscribe(housesList => subscribedHouses = housesList);
    store.dispatch(ActionFactory.clearHouses());
  });

  it('will always start with an empty store', () => {
    expect(subscribedHouses).to.eql([]);
  });

  describe('when response comes from service', () => {

    beforeEach(() => {
      (mockHouseService.getHouses as sinon.SinonStub).returns(new BehaviorSubject(mockResponse));
    });

    it('will ensure houses are updated', () => {
      guard.canActivate(null).subscribe();
      expect(subscribedHouses).to.eql(mockResponse);
    });

    it('will allow activation', () => {
      let result = false;
      guard.canActivate(null).subscribe(value => result = value);
      expect(result).to.be.ok;
    });

  });

  describe('when no response comes from service', () => {

    beforeEach(() => {
      (mockHouseService.getHouses as sinon.SinonStub).returns(new BehaviorSubject([]));
    });

    it('will allow activation', () => {
      let result: boolean;
      guard.canActivate(null).subscribe(value => result = value);
      expect(result).to.be.ok;
    });
  });
});
