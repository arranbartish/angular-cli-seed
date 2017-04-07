import {fakeAsync, inject, TestBed} from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod, ConnectionBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HouseService} from './house.service';
import {House} from '../domain/housing';
import {HousingModule} from '../housing.module';
import {expect} from 'chai';

// potential example
// https://angular-2-training-book.rangle.io/handout/testing/services/mockbackend.html
// http://plnkr.co/edit/K9gzDOcEOcmfFaOacdKZ?p=info

describe('HouseService', () => {

  let service: HouseService;
  let mockBackend: MockBackend;

  const mockResponse = [{
    'country': 'Australia',
    'state': 'South Australia',
    'city': 'Adelaide',
    'construction': '1990',
    'rooms': 6
  }];
  const expectedHouse: House = {
    country: 'Australia',
    state: 'South Australia',
    city: 'Adelaide',
    construction: '1990',
    rooms: 6
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HousingModule, HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    });
  });

  beforeEach(inject([XHRBackend, HouseService], (backend: ConnectionBackend, houseService: HouseService) => {
    service = houseService;
    mockBackend = backend as MockBackend;
  }));


  describe('getHouses', () => {

    const expectedUrl = '/assets/mock/list/houses.json';

    beforeEach(() => {
      mockHttpInteractionsForUrl(expectedUrl);
    });

    it('will get houses from http request', fakeAsync(function () {

        let result: House[] = [];
        service.getHouses()
          .subscribe(res => {
            result = res;
          });
        expect(result[0]).to.eql(expectedHouse);
      }
    ));

  });

  describe('findHouses', () => {

    const term = 'whatever';
    const expectedUrl = '/assets/mock/search/houses.json?q=whatever';

    beforeEach(() => {
      mockHttpInteractionsForUrl(expectedUrl);
    });

    it('will find houses from http request', fakeAsync(function () {

        let result: House[] = [];
        service.findHouses(term)
          .subscribe(res => {
            result = res;
          });
        expect(result[0]).to.eql(expectedHouse);
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
