import {Injectable, EventEmitter} from '@angular/core';
import {SearchEvent} from './search-event';

@Injectable()
export class SearchFormService {
  public searchDone$: EventEmitter<SearchEvent>;

  constructor() {
    this.searchDone$ = new EventEmitter();
  }

  registerMe(action: Function) {
    this.searchDone$.subscribe(event => action(event));
  }

  searchDone(name: string, term: string) {
    const event: SearchEvent = {
      name: name,
      term: term
    };
    this.searchDone$.emit(event);
  }

}
