import { expect } from 'chai';
import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod, ConnectionBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {CarService} from './car.service';
import {Car} from '../domain/car';
import {CarModule} from '../car.module';

// potential example
// https://angular-2-training-book.rangle.io/handout/testing/services/mockbackend.html
// http://plnkr.co/edit/K9gzDOcEOcmfFaOacdKZ?p=info

describe('CarService', () => {

  let service: CarService;
  let mockBackend: MockBackend;

  const mockResponse = [{
    'brand': 'Toyota',
    'model': 'Camery',
    'year': '2011',
    'condition': 'Awesome'
  }];
  const expectedCar: Car = {
    brand: 'Toyota',
    model: 'Camery',
    year: '2011',
    condition: 'Awesome'
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarModule, HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    });
  });

  beforeEach(inject([XHRBackend, CarService], (backend: ConnectionBackend, carService: CarService) => {
    service = carService;
    mockBackend = backend as MockBackend;
  }));


  describe('getCars', () => {

    const expectedUrl = '/assets/mock/list/cars.json';

    beforeEach(() => {
      mockHttpInteractionsForUrl(expectedUrl);
    });

    it('will get cars from http request', fakeAsync(function () {

        let result: Car[] = [];
        service.getCars()
          .subscribe(res => {
            result = res;
          });
        expect(result[0]).to.eql(expectedCar);
      }
    ));

  });

  describe('findCars', () => {

    const term = 'whatever';
    const expectedUrl = '/assets/mock/search/cars.json?q=whatever';

    beforeEach(() => {
      mockHttpInteractionsForUrl(expectedUrl);
    });

    it('will find cars from http request', fakeAsync(function () {

        let result: Car[] = [];
        service.findCars(term)
          .subscribe(res => {
            result = res;
          });
        expect(result[0]).to.eql(expectedCar);
      }
    ));

  });

  function mockHttpInteractionsForUrl(url: string) {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).to.equal(RequestMethod.Get);
        expect(connection.request.url).to.equal(url);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockResponse })
        ));
      });
  }
});
