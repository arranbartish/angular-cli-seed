import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {SearchResultComponent} from './search-result.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModule, Store} from '@ngrx/store';
import {Car, CarState} from '../../domain/car';
import {cars} from '../../reducers/car.reducer';
import {ActionFactory} from '../../actions/cars';
import {SearchOptions} from 'arranbartish-angular-cli-widgets';
import {expect} from 'chai';

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
  let mockProviders;
  let carStore: Store<CarState>;
  let params: Params;

  function mockQueryStringBehaviour(term: string) {
    params = { q: term };

    mockProviders = [
      {
        provide: ActivatedRoute,
        useClass: class {
          queryParams: Observable<Params> = new BehaviorSubject(params);
        }
      }
    ];
  }

  function setupMocksWithTerm() {
    mockQueryStringBehaviour('find-me');
  }

  function setupMocksWithoutTerm() {
    mockQueryStringBehaviour(undefined);
  }

  describe('when initialised and a search term is provided', () => {

    beforeEach(async(() => {
      setupMocksWithTerm();
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore({ cars })],
        declarations: [SearchResultComponent],
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
      expect(component).to.exist;
    });


    it('will expose search results', () => {
      expect(component.searchResults).to.eql(carResponse);
    });

    it('will be configured with search options', () => {
      expect(component.searchOptions).to.eql(expectedSearchOptions);
    });
  });

  describe('when initialised and a search term is not provided', () => {

    beforeEach(async(() => {
      setupMocksWithoutTerm();
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore({ cars })],
        declarations: [SearchResultComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: mockProviders
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchResultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    beforeEach(
      inject([Store], (_carStore: Store<CarState>) => { carStore = _carStore; })
    );

    beforeEach(() => {
      component.ngOnInit();
    });

    it('will be defined', () => {
      expect(component).to.exist;
    });

    it('will not expose search results', () => {
      expect(component.searchResults).to.eql([]);
    });

  });

});
