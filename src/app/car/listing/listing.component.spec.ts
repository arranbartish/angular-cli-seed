import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComponent } from './listing.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CarService} from '../service/car.service';
import {Car} from '../domain/car';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

describe('ListingComponent', () => {
  const carResponse: Car[] = [{
    brand: 'rolls',
    model: 'can-ardly',
    year: '1950',
    condition: 'almost 70 years old, what do you think?'
  }];

  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;

  beforeEach(async(() => {

    const mockCarsResponse: Observable<Car[]> = new BehaviorSubject(carResponse);
    const mockedGetCars = jasmine.createSpy('findCars');
    mockedGetCars.and.returnValue(mockCarsResponse);

    TestBed.configureTestingModule({
      declarations: [ ListingComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: CarService,
        useClass: class {
          findCars = jasmine.createSpy('findCars');
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

  it('will be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      component.ngOnInit();
    });

    it('will define options', () => {
        expect(component.searchOptions).toEqual({
          name: 'cars',
          target: './search'
        });
    });

    it('will have the car list populated', () => {
        expect(component.carList).toEqual(carResponse);
    });
  });
});
