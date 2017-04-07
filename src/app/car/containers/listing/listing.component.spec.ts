import { expect } from 'chai';
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {ListingComponent} from './listing.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreModule, Store} from '@ngrx/store';
import {Car, CarState} from '../../domain/car';
import {cars} from '../../reducers/car.reducer';
import {ActionFactory} from '../../actions/cars';

describe('ListingComponent', () => {
  const carResponse: Car[] = [{
    brand: 'rolls',
    model: 'can-ardly',
    year: '1950',
    condition: 'almost 70 years old, what do you think?'
  }];

  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let carStore: Store<CarState>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore({cars})],
      declarations: [ ListingComponent ],
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

  beforeEach(inject([Store], (_carStore: Store<CarState>) => {
    carStore = _carStore;
  }));

  it('will be defined', () => {
    expect(component).to.exist;
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      component.ngOnInit();
      carStore.dispatch(ActionFactory.listCars(carResponse));
    });

    it('will define options', () => {
        expect(component.searchOptions).to.eql({
          name: 'cars',
          target: './search'
        });
    });

    it('will have the car list populated', () => {
        expect(component.carList).to.eql(carResponse);
    });
  });
});
