import {TestBed, inject} from '@angular/core/testing';
import {StoreModule, Store, Action} from '@ngrx/store';
import {SeachState, SearchAction} from '../domain/search-event';
import {term} from './term.reducer';
import {WidgitModule} from '../../widgit.module';

describe('search reducer', () => {

  let store: Store<SeachState>;

  let subscribedTerm: string;

  const termPayload = 'I am looking for you';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WidgitModule, StoreModule.provideStore({term})],
    });
  });

  beforeEach(inject([Store], (_store: Store<SeachState>) => {
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.term).subscribe(term => subscribedTerm = term);
  });

  describe(SearchAction[SearchAction.CHANGE_TERM], () => {

    it('will return a search term that is the same as the payload when the state is empty', () => {
      const action: Action = {
        type: SearchAction[SearchAction.CHANGE_TERM],
        payload: termPayload
      };
      store.dispatch(action);
      expect(subscribedTerm).toEqual(termPayload);
    });

    it('will return term and remove and existing term when state is not empty', () => {
      store.dispatch({
        type: SearchAction[SearchAction.CHANGE_TERM],
        payload: 'I do not want this'
      });

      const action: Action = {
        type: SearchAction[SearchAction.CHANGE_TERM],
        payload: termPayload
      };
      store.dispatch(action);

      expect(subscribedTerm).toEqual(termPayload);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      const initialState: Action = {
        type: SearchAction[SearchAction.CHANGE_TERM],
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
