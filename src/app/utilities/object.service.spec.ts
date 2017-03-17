import { TestBed, inject } from '@angular/core/testing';
import { ObjectService } from './object.service';

describe('ObjectService', () => {

  interface SomeInterface {
    someProperty: string;
    anotherProperty: string;
  }

  const originalSomething: SomeInterface = {
    someProperty: 'some value',
    anotherProperty: 'another value'
  };

  let service: ObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectService]
    });
  });

  beforeEach(inject([ObjectService], (objectService: ObjectService) => {
      service = objectService;
  }));


  it('will be defined', sinon.test(() => {
      expect(service).to.exist;
  }));


  describe('shallow copy object', () => {

    it('will copy properties from original to target', sinon.test(() => {
      const target = service.shallowCopy({}, originalSomething);
      expect(target).to.eql(originalSomething);
    }));
  });

});
