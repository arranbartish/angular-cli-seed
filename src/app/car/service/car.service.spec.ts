import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing/mock_backend';

import { CarService } from './car.service';
import {Car} from "../domain/car";

// potential example
// https://angular-2-training-book.rangle.io/handout/testing/services/mockbackend.html
// http://plnkr.co/edit/K9gzDOcEOcmfFaOacdKZ?p=info

describe('CarService', () => {

  let service : CarService;
  let mockBackend : MockBackend;

  const mockResponse = [{
    "brand": "Toyota",
    "model": "Camery",
    "year": "2011",
    "condition": "Awesome"
  }];
  const expectedCar : Car = {
    brand: 'Toyota',
    model: 'Camery',
    year: '2011',
    condition: 'Awesome'
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        CarService
      ]
    });
  });

  beforeEach(inject([XHRBackend, CarService], (backend: XHRBackend, carService: CarService) => {
    service = carService;
    mockBackend = backend as MockBackend;
  }));


  describe('getCars', () => {

    const expectedUrl : string = '/assets/mock/list/cars.json';

    beforeEach(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });
    });

    it('will get cars from service', fakeAsync(function () {

        let result : Car[] = [];
        service.getCars()
          .subscribe(res => {
            result = res;
          });
        expect(result[0]).toEqual(expectedCar);
      }
    ));

  });

  describe('findCars', () => {

    const term : string = 'whatever';
    const expectedUrl : string = '/assets/mock/search/cars.json?q=whatever';

    beforeEach(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });
    });

    it('will find cars from service', fakeAsync(function () {

        let result : Car[] = [];
        service.findCars(term)
          .subscribe(res => {
            result = res;
          });
        expect(result[0]).toEqual(expectedCar);
      }
    ));

  });

});
