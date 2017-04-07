import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { SearchResultComponent } from './search-result.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store, StoreModule } from '@ngrx/store';
import { House, HousesState } from '../../domain/housing';
import { ActionFactory } from '../../actions/housing';
import { houses } from '../../reducers/houses.reducer';
import { expect } from 'chai';
import { SearchOptions } from 'arranbartish-angular-cli-widgets';

describe('SearchResultComponent', () => {
  const houseResponse: House[] = [{
    country: 'Australia',
    state: 'Victoria',
    city: 'Melbourne',
    construction: '1983',
    rooms: 6
  }];

  const expectedSearchOptions: SearchOptions = {
    name: 'houses',
    target: './search'
  };

  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockProviders;
  let houseStore: Store<HousesState>;
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
        imports: [StoreModule.provideStore({ houses })],
        declarations: [SearchResultComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: mockProviders
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchResultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([Store], (_houseStore: Store<HousesState>) => {
      houseStore = _houseStore;
    }));

    beforeEach(() => {
      component.ngOnInit();
      houseStore.dispatch(ActionFactory.listHouses(houseResponse));
    });

    it('will be defined', () => {
      expect(component).to.exist;
    });

    it('will expose search results', () => {
      expect(component.searchResults).to.eql(houseResponse);
    });

    it('will be configured with search options', () => {
      expect(component.searchOptions).to.eql(expectedSearchOptions);
    });
  });

  describe('when initialised and a search term is not provided', () => {

    beforeEach(async(() => {
      setupMocksWithoutTerm();
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore({ houses })],
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

    beforeEach(inject([Store], (_houseStore: Store<HousesState>) => {
      houseStore = _houseStore;
    }));

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
