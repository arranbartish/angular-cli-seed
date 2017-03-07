import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod, ConnectionBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing/mock_backend';
import {CarService} from './car.service';
import {StoreModule, Store, Action} from '@ngrx/store';
import {cars} from '../reducers/car.reducer';
import {CarModule} from '../car.module';
import {Car, CarState} from '../domain/car';
import {ActionFactory} from '../actions/cars';

// potential example
// https://angular-2-training-book.rangle.io/handout/testing/services/mockbackend.html
// http://plnkr.co/edit/K9gzDOcEOcmfFaOacdKZ?p=info

describe('CarService', () => {

  let service: CarService;
  let mockBackend: MockBackend;
  let store: Store<CarState>;

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
  let result: Car[] = [];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarModule, HttpModule, StoreModule.provideStore({cars})],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    });
  });

  beforeEach(inject([XHRBackend, CarService, Store], (backend: ConnectionBackend, carService: CarService, _store: Store<CarState>) => {
    service = carService;
    mockBackend = backend as MockBackend;
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.cars).subscribe(cars => result = cars);
    store.dispatch(ActionFactory.listCars([]));
  });

  describe('getCars', () => {

    const expectedUrl = '/assets/mock/list/cars.json';

    beforeEach(() => {
      mockHttpInteractionsForUrl(expectedUrl);
    });

    it('will get cars from http request', fakeAsync(function () {
        service.getCars();
        expect(result[0]).toEqual(expectedCar);
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

        service.findCars(term);
        expect(result[0]).toEqual(expectedCar);
      }
    ));

    describe('store', () => {

      const expectedAction: Action = ActionFactory.listCars([expectedCar]);

      it('will generate a dispatch with the payload', fakeAsync(() => {
        let cars: Car[];

        store.select(state => state.cars).subscribe(
          model => cars = model
        );

        service.findCars(term);

        expect(cars).toEqual(expectedAction.payload);
      }));

      it('will be defined', () => {
          expect(store).toBeDefined();
      });
    });

  });

  function mockHttpInteractionsForUrl(url: string) {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(url);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockResponse })
        ));
      });
  }
});
