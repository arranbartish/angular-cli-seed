import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing/mock_backend';

import { CarService } from './car.service';

// fix this so we can mock http
// http://chariotsolutions.com/blog/post/testing-angular-2-0-x-services-http-jasmine-karma/
// maybe extend the class?
// http://www.typescriptlang.org/docs/handbook/classes.html

// potential example
// https://angular-2-training-book.rangle.io/handout/testing/services/mockbackend.html
// http://plnkr.co/edit/K9gzDOcEOcmfFaOacdKZ?p=info

describe('CarService', () => {

  const mockResponse = {
    "batchcomplete": "",
    "continue": {
      "sroffset": 10,
      "continue": "-||"
    },
    "query": {
      "searchinfo": {
        "totalhits": 36853
      },
      "search": [{
        "ns": 0,
        "title": "Stuff",
        "snippet": "<span></span>",
        "size": 1906,
        "wordcount": 204,
        "timestamp": "2016-06-10T17:25:36Z"
      }]
    }
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

  it('will get "cars" from service', fakeAsync(
    inject([
      XHRBackend,
      CarService
    ], (backend: XHRBackend, carService: CarService) => {

      const expectedUrl = '/assets/mock/list/cars.json';

      backend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });

      carService.getCars()
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })
  ));
});
