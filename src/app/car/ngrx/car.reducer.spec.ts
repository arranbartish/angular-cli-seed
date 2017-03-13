import {Car, CarAction, CarState} from '../domain/car';
import {cars} from './car.reducer';
import {TestBed, inject} from '@angular/core/testing';
import {CarModule} from '../car.module';
import {StoreModule, Store, Action} from '@ngrx/store';

describe('car reducer', () => {

  let store: Store<CarState>;

  let subscribedCars: Car[];

  const carsPayload: Car[] = [
    {
      brand: 'ford',
      model: 'fairlane',
      year: '1980',
      condition: 'yuck'
    }, {
      brand: 'Holden',
      model: 'Commodore',
      year: '2010',
      condition: 'HSV'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarModule, StoreModule.provideStore({cars})],
    });
  });

  beforeEach(inject([Store], (_store: Store<CarState>) => {
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.cars).subscribe(model => subscribedCars = model);
  });

  describe(CarAction[CarAction.SET_CARS], () => {

    it('will return array that is the same as the payload when the state is empty', () => {
      const action: Action = {
        type: CarAction[CarAction.SET_CARS],
        payload: carsPayload
      };
      store.dispatch(action);
      expect(subscribedCars).to.equal(carsPayload);
    });

    it('will return array removes existing values when state is not empty', () => {
      store.dispatch({
        type: CarAction[CarAction.SET_CARS],
        payload: [{brand: 'going',
          model: 'to',
          year: 'be',
          condition: 'removed'}]
      });

      const action: Action = {
        type: CarAction[CarAction.SET_CARS],
        payload: carsPayload
      };
      store.dispatch(action);

      expect(subscribedCars).to.equal(carsPayload);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      const initialState: Action = {
        type: CarAction[CarAction.SET_CARS],
        payload: carsPayload
      };
      store.dispatch(initialState);

      const action: Action = {
        type: 'some random string',
        payload: []
      };
      store.dispatch(action);

      expect(subscribedCars).to.equal(carsPayload);
    });

  });

  describe(CarAction[CarAction.ADD_CAR], () => {

    it('Will add car to the state', () => {
      const carToAdd: Car = {
        brand: 'going',
        model: 'to',
        year: 'be',
        condition: 'added'
      };

      const action: Action = {
        type: CarAction[CarAction.ADD_CAR],
        payload: carToAdd
      };

      const initialState: Action = {
        type: CarAction[CarAction.SET_CARS],
        payload: carsPayload
      };
      store.dispatch(initialState);

      store.dispatch(action);

      expect(subscribedCars).to.equal([...carsPayload, carToAdd]);
    });
  });

});
