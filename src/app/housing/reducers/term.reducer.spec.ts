import {TestBed, inject} from '@angular/core/testing';
import {StoreModule, Store, Action} from '@ngrx/store';
import {term} from './term.reducer';
import {HousingAction, ActionFactory} from '../actions/housing';
import {expect} from 'chai';
import {HousesState} from '../domain/housing';

describe('search reducer', () => {

  let store: Store<HousesState>;

  let subscribedTerm: string;

  const termPayload = 'I am looking for you';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore({term})],
    });
  });

  beforeEach(inject([Store], (_store: Store<HousesState>) => {
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.term).subscribe(term => subscribedTerm = term);
  });

  describe(HousingAction.SEARCH, () => {

    it('will return a search term that is the same as the payload when the state is empty', () => {
      store.dispatch(ActionFactory.search(termPayload));
      expect(subscribedTerm).to.equal(termPayload);
    });

    it('will return term and remove and existing term when state is not empty', () => {
      store.dispatch(ActionFactory.search('I do not want this'));

      store.dispatch(ActionFactory.search(termPayload));

      expect(subscribedTerm).to.equal(termPayload);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      store.dispatch(ActionFactory.search(termPayload));

      const action: Action = {
        type: 'some random string',
        payload: 'I do not want this'
      };
      store.dispatch(action);
      expect(subscribedTerm).to.equal(termPayload);
    });

  });


});
