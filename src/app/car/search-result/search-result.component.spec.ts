import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchFormService} from "../../widgit/search-form/search-form.service";
import {CarService} from "../service/car.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Car} from "../domain/car";
import {SearchOptions} from "../../widgit/search-form/search-options";

describe('SearchResultComponent', () => {
  const carResponse : Car[] = [{
    brand: 'rolls',
    model: 'can-ardly',
    year: '1950',
    condition: 'almost 70 years old, what do you think?'
  }];

  const expectedSearchOptions : SearchOptions =
    { name: 'cars',
    target: './search' };

  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockedQueryParams;
  let mockedFindCars;
  let mockProviders;
  let mockSearchFormService;
  let mockCarService;

  function setupMocks(term: string) {

    let mockCarsResponse : Observable<Car[]> = new BehaviorSubject(carResponse);
    let mockTermResponse : Observable<string> = new BehaviorSubject(term);

    mockedQueryParams = jasmine.createSpyObj("queryParams", ["map"]);
    mockedQueryParams.map.and.returnValue(mockTermResponse);

    mockedFindCars = jasmine.createSpy("findCars");
    if(!!term){
      mockedFindCars.and.returnValue(mockCarsResponse);
    }

    mockProviders = [
      {
        provide: CarService,
        useClass: class {
          findCars = mockedFindCars;
          getCars = jasmine.createSpy("getCars");
        }
      },
      {
        provide: SearchFormService,
        useClass: class {
          registerMe = jasmine.createSpy("registerMe");
          searchDone = jasmine.createSpy("searchDone");
        }
      },
      {
        provide: ActivatedRoute,
        useClass: class {
          queryParams = mockedQueryParams;
        }
      }
    ];
  }

  function setupMocksWithTerm(){
    setupMocks('find-me');
  }

  function setupMocksWithoutTerm(){
    setupMocks(undefined);
  }

  describe('when initialised and a search term is provided', () => {

    beforeEach(async(() => {
      setupMocksWithTerm();
      TestBed.configureTestingModule({
        declarations: [ SearchResultComponent ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: mockProviders
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchResultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    beforeEach(inject([CarService, SearchFormService], (carService: CarService, searchFormService: SearchFormService) => {
      mockSearchFormService = searchFormService;
      mockCarService = carService;
    }));

    beforeEach(() => {
      component.ngOnInit();
    });

    it('will be defined', () => {
      expect(component).toBeDefined();
    });

    it('will refresh search results on initialisation', () => {
      expect(mockCarService.findCars).toHaveBeenCalledWith('find-me');
    });

    it('will expose search results', () => {
      expect(component.searchResults).toEqual(carResponse);
    });

    it('will be configured with search options', () => {
        expect(component.searchOptions).toEqual(expectedSearchOptions);
    });

    it('will refresh search results on configured search event', () => {

      component.refreshSearchResultsOnEvent({
        term: 'now-find-me',
        name: expectedSearchOptions.name
      });
      expect(mockCarService.findCars).toHaveBeenCalledWith('now-find-me');
    });

    it('will not refresh search results on a random event', () => {

      component.refreshSearchResultsOnEvent({
        term: 'whatever',
        name: 'random-event'
      });
      expect(mockCarService.findCars).not.toHaveBeenCalledWith('whatever');
    });

    it('will register for search events', () => {
        expect(mockSearchFormService.registerMe).toHaveBeenCalled();
    });
  });

  describe('when initialised and a search term is not provided', () => {

    beforeEach(async(() => {
      setupMocksWithoutTerm();
      TestBed.configureTestingModule({
        declarations: [ SearchResultComponent ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: mockProviders
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchResultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([CarService, SearchFormService], (carService: CarService, searchFormService: SearchFormService) => {
      mockSearchFormService = searchFormService;
      mockCarService = carService;
    }));

    beforeEach(() => {
      component.ngOnInit();
    });

    it('will be defined', () => {
      expect(component).toBeDefined();
    });

    it('will not refresh search results on initialisation', () => {
      expect(mockCarService.findCars).not.toHaveBeenCalled();
    });

    it('will not expose search results', () => {
      expect(component.searchResults).not.toBeDefined();
    });

    it('will register for search events', () => {
      expect(mockSearchFormService.registerMe).toHaveBeenCalled();
    });
  });
});
