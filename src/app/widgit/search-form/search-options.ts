import {Store} from '@ngrx/store';
import {SeachState} from './domain/search-event';
export interface SearchOptions {
  name: string;
  target: string;
  store?: Store<SeachState>;
}
