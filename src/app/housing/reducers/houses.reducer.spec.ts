import {TestBed, inject} from '@angular/core/testing';
import {StoreModule, Store, Action} from '@ngrx/store';
import {expect} from 'chai';
import {House, HousesState} from '../domain/housing';
import {ActionFactory, HousingAction} from '../actions/housing';
import {HousingModule} from '../housing.module';
import {houses} from './houses.reducer';

describe('housing reducer', () => {

  let store: Store<HousesState>;

  let subscribedHouses: House[];

  const housingPayload: House[] = [
    {
      country: 'Australia',
      state: 'Victoria',
      city: 'Melbourne',
      construction: '1985',
      rooms: 6
    },
    {
      country: 'Canada',
      state: 'Quebec',
      city: 'Montreal',
      construction: '1960',
      rooms: 4
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HousingModule, StoreModule.provideStore({houses})],
    });
  });

  beforeEach(inject([Store], (_store: Store<HousesState>) => {
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.houses).subscribe(model => subscribedHouses = model);
  });

  describe(HousingAction.LIST_HOUSES, () => {

    it('will return array that is the same as the payload when the state is empty', () => {
      store.dispatch(ActionFactory.listHouses(housingPayload));
      expect(subscribedHouses).to.eql(housingPayload);
    });

    it('will be the same as when a search is complete', () => {
      const listHousesAction: Action = ActionFactory.listHouses(housingPayload);
      const searchHousingComplete: Action = ActionFactory.searchComplete(housingPayload);
      expect(searchHousingComplete).to.eql(listHousesAction);
    });


    it('will return array removes existing values when state is not empty', () => {
      store.dispatch(ActionFactory.listHouses([{
        country: 'going',
        state: 'to',
        city: 'be',
        construction: 'removed',
        rooms: 1
      }]));

      store.dispatch(ActionFactory.listHouses(housingPayload));

      expect(subscribedHouses).to.eql(housingPayload);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      store.dispatch(ActionFactory.listHouses(housingPayload));

      const action: Action = {
        type: 'some random string',
        payload: []
      };
      store.dispatch(action);

      expect(subscribedHouses).to.eql(housingPayload);
    });

  });

});
