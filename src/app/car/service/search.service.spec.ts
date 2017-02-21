import { TestBed, inject } from '@angular/core/testing';
import { CarSearchService } from './car-search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarSearchService]
    });
  });

  it('should ...', inject([CarSearchService], (service: CarSearchService) => {
    expect(service).toBeTruthy();
  }));
});
