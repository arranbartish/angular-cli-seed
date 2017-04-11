import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { expect } from 'chai';
import { of } from 'rxjs/observable/of';
import { ListingComponent } from './listing.component';
import { House, HousesState } from '../../domain/housing';
import { ActionFactory } from '../../actions/housing';
import { houses } from '../../reducers/houses.reducer';

describe('ListingComponent', () => {
  const houseResponse: House[] = [{
    country: 'Australia',
    state: 'Victoria',
    city: 'Melbourne',
    construction: '1983',
    rooms: 6
  }];

  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let housingStore: Store<HousesState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore({ houses })],
      declarations: [ListingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (_housingStore: Store<HousesState>) => {
    housingStore = _housingStore;
  }));

  it('will be defined', () => {
    expect(component).to.exist;
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
      housingStore.dispatch(ActionFactory.listHouses(houseResponse));
    });

    it('will define options', () => {
      expect(component.searchOptions).to.eql({
        name: 'houses',
        target: './search'
      });
    });

    it('will have the house list populated', () => {
      expect(component.houseList).to.eql(houseResponse);
    });
  });
});

/// Mocking the Store<HousesState>
describe('ListingComponent houseCreated', () => {
  let fixture: ComponentFixture<ListingComponent>;
  let component: ListingComponent;
  let store: Store<HousesState>;

  const houseResponse: House[] = [{
    country: 'Australia',
    state: 'Victoria',
    city: 'Melbourne',
    construction: '1983',
    rooms: 6
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ListingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Store,
          useClass: class {
            dispatch = sinon.stub();
            select = () => of(houseResponse);
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(fakeAsync(inject([Store], (_store: Store<HousesState>) => {
    store = _store;
  })));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('will dispatch an Action (containing the new house) to the Store', () => {
    const newHouse: House = { country: 'the-country', state: 'the-state', city: 'the-city', construction: '1955', rooms: 1 };
    component.houseCreated(newHouse);

    expect((store.dispatch as sinon.SinonStub).calledOnce).to.be.true;
    expect((store.dispatch as sinon.SinonStub).calledWithExactly(ActionFactory.addHouse(newHouse))).to.be.true;
  });
});
