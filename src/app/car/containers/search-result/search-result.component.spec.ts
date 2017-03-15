import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModule, Store} from '@ngrx/store';
import {Car, CarState} from '../../domain/car';
import {SearchOptions} from '../../../widgit/search-form/search-options';
import {cars} from '../../reducers/car.reducer';
import {ActionFactory} from '../../actions/cars';

describe('SearchResultComponent', () => {
  const carResponse: Car[] = [{
    brand: 'rolls',
    model: 'can-ardly',
    year: '1950',
    condition: 'almost 70 years old, what do you think?'
  }];

  const expectedSearchOptions: SearchOptions = {
    name: 'cars',
    target: './search'
  };

  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockedQueryParams;
  let mockProviders;
  let carStore: Store<CarState>;

  function mockQueryStringBehaviour (term: string) {
    const mockTermResponse: Observable<string> = new BehaviorSubject(term);
    mockedQueryParams = jasmine.createSpyObj('queryParams', ['map']);
    mockedQueryParams.map.and.returnValue(mockTermResponse);
  }

  function setupMocks(term: string) {

    mockQueryStringBehaviour(term);

    mockProviders = [
      {
        provide: ActivatedRoute,
        useClass: class {
          queryParams = mockedQueryParams;
        }
      }
    ];
  }

  function setupMocksWithTerm() {
    setupMocks('find-me');
  }

  function setupMocksWithoutTerm() {
    setupMocks(undefined);
  }

  describe('when initialised and a search term is provided', () => {

    beforeEach(async(() => {
      setupMocksWithTerm();
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore({cars})],
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


    beforeEach(inject([Store],
        (_carStore: Store<CarState>) => {
      carStore = _carStore;
    }));

    beforeEach(() => {
      component.ngOnInit();
      carStore.dispatch(ActionFactory.listCars(carResponse));
    });

    it('will be defined', () => {
      expect(component).toBeDefined();
    });


    it('will expose search results', () => {
      expect(component.searchResults).toEqual(carResponse);
    });

    it('will be configured with search options', () => {
        expect(component.searchOptions).toEqual(expectedSearchOptions);
    });


  });

  describe('when initialised and a search term is not provided', () => {

    beforeEach(async(() => {
      setupMocksWithoutTerm();
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore({cars})],
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


    beforeEach(inject([Store],
      (_carStore: Store<CarState>) => {
        carStore = _carStore;
      }
    ));

    beforeEach(() => {
      component.ngOnInit();
    });

    it('will be defined', () => {
      expect(component).toBeDefined();
    });

    it('will not expose search results', () => {
      expect(component.searchResults).toEqual([]);
    });

  });
});
