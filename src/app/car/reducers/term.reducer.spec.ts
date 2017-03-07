import {TestBed, inject} from '@angular/core/testing';
import {StoreModule, Store, Action} from '@ngrx/store';
import {CarState} from '../domain/car';
import {term} from './term.reducer';
import {WidgitModule} from '../../widgit/widgit.module';
import {CarAction} from '../actions/cars';

describe('search reducer', () => {

  let store: Store<CarState>;

  let subscribedTerm: string;

  const termPayload = 'I am looking for you';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WidgitModule, StoreModule.provideStore({term})],
    });
  });

  beforeEach(inject([Store], (_store: Store<CarState>) => {
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.term).subscribe(term => subscribedTerm = term);
  });

  describe(CarAction.SEARCH, () => {

    it('will return a search term that is the same as the payload when the state is empty', () => {
      const action: Action = {
        type: CarAction.SEARCH,
        payload: termPayload
      };
      store.dispatch(action);
      expect(subscribedTerm).toEqual(termPayload);
    });

    it('will return term and remove and existing term when state is not empty', () => {
      store.dispatch({
        type: CarAction.SEARCH,
        payload: 'I do not want this'
      });

      const action: Action = {
        type: CarAction.SEARCH,
        payload: termPayload
      };
      store.dispatch(action);

      expect(subscribedTerm).toEqual(termPayload);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      const initialState: Action = {
        type: CarAction.SEARCH,
        payload: termPayload
      };
      store.dispatch(initialState);

      const action: Action = {
        type: 'some random string',
        payload: 'I do not want this'
      };
      store.dispatch(action);
      expect(subscribedTerm).toEqual(termPayload);
    });

  });


});
