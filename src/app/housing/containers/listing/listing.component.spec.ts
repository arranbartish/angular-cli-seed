import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ListingComponent } from './listing.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { House, HousesState } from '../../domain/housing';
import { ActionFactory } from '../../actions/housing';
import { houses } from '../../reducers/houses.reducer';
import { expect } from 'chai';

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

  describe('houseCreated', () => {
    // to be reviewed!
    xit('will dispatch an Action (containing the new house) to the Store', () => {
      let houseState: any;
      housingStore.subscribe(event => houseState = event);

      var newHouse: House = { country: 'the-country', state: 'the-state', city: 'the-city', construction: '1955', rooms: 1 };
      component.houseCreated(newHouse);

      expect(houseState).to.be.not.undefined;
      debugger;
      // expect(houseState).to.equal(validSampleHouseEntity);
    });
  });
});
