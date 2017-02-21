import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import { CarService } from './car-service.service';

// fix this so we can mock http
// http://chariotsolutions.com/blog/post/testing-angular-2-0-x-services-http-jasmine-karma/
// maybe extend the class?
// http://www.typescriptlang.org/docs/handbook/classes.html
describe('CarService', () => {
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CarService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports : [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  it('should ...', inject([CarService], (service: CarService) => {
    expect(service).toBeTruthy();
  }));
});
