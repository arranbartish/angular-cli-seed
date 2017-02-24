import { TestBed, inject } from '@angular/core/testing';
import { SearchFormService } from './search-form.service';
import {ReactiveFormsModule} from "@angular/forms";
import {SearchEvent} from "./search-event";

describe('SearchFormService', () => {

  let searchFormService : SearchFormService;
  const expectedSearchEvent : SearchEvent = {
    name : 'You\'ve been',
    term : 'called'
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[ReactiveFormsModule],
      providers: [SearchFormService]
    });
  });

  beforeEach(inject([SearchFormService], (service: SearchFormService) => {
    searchFormService = service;
  }));

  it('will be defined', () => {
    expect(searchFormService).toBeDefined();
  });

  it('will notify me when I am registered', () => {
    let called : boolean = false;
    function callMe() {
      called = true;
    }

    searchFormService.registerMe(callMe);
    searchFormService.searchDone(expectedSearchEvent.name, expectedSearchEvent.term);
    expect(called).toBeTruthy();
  });

  it('will inform me about the event when I am registered', () => {
    let event : SearchEvent = {
      name: 'super fail',
      term: 'fail'
    };

    function callMe(result:SearchEvent) {
      event = result;
    }

    searchFormService.registerMe(callMe);
    searchFormService.searchDone(expectedSearchEvent.name, expectedSearchEvent.term);
    expect(event).toEqual(expectedSearchEvent);
  });
});
