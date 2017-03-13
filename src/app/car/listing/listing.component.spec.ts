import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
//import * as sinon from 'sinon';
// import * as sinonChai from 'sinon-chai';
// import * as chai from 'chai';
//import * as chai from '@types/sinon-chai';
import { ListingComponent } from './listing.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CarService} from '../service/car.service';
import {Car, CarState, CarAction} from '../domain/car';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StoreModule, Store} from '@ngrx/store';
import {cars} from '../ngrx/car.reducer';

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

    const mockCarsResponse: Observable<Car[]> = new BehaviorSubject(carResponse);
    const mockedGetCars = sinon.stub().and.return(mockCarsResponse);
    //const mockedFindCars = sinon.stub()
    //const mockedGetCars = jasmine.createSpy('findCars');
    //mockedGetCars.and.returnValue(mockCarsResponse);

    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore({cars})],
      declarations: [ ListingComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: CarService,
        useClass: class {
          findCars = sinon.stub();
          getCars = mockedGetCars;
        }
      }]

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
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      component.ngOnInit();
      carStore.dispatch({
        type: CarAction[CarAction.SET_CARS],
        payload: carResponse
      });
    });

    it('will define options', () => {
        expect(component.searchOptions).to.equal({
          name: 'cars',
          target: './search'
        });
    });

    it('will have the car list populated', () => {
        expect(component.carList).to.equal(carResponse);
    });
  });
});
