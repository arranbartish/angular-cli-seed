import {Car, CarState} from '../domain/car';
import {cars} from './car.reducer';
import {TestBed, inject} from '@angular/core/testing';
import {CarModule} from '../car.module';
import {StoreModule, Store, Action} from '@ngrx/store';
import {CarAction, ActionFactory} from '../actions/cars';

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

  describe(CarAction.LIST_CARS, () => {

    it('will return array that is the same as the payload when the state is empty', () => {
      store.dispatch(ActionFactory.listCars(carsPayload));
      expect(subscribedCars).to.equal(carsPayload);
    });

    it('will be the same as when a search is complete', () => {
      const listCarsAction: Action = ActionFactory.listCars(carsPayload);
      const searchCarsComplete: Action = ActionFactory.searchComplete(carsPayload);
      expect(searchCarsComplete).to.equal(listCarsAction);
    });


    it('will return array removes existing values when state is not empty', () => {
      store.dispatch(ActionFactory.listCars([{brand: 'going',
        model: 'to',
        year: 'be',
        condition: 'removed'}]));

      store.dispatch(ActionFactory.listCars(carsPayload));

      expect(subscribedCars).to.equal(carsPayload);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      store.dispatch(ActionFactory.listCars(carsPayload));

      const action: Action = {
        type: 'some random string',
        payload: []
      };
      store.dispatch(action);

      expect(subscribedCars).to.equal(carsPayload);
    });

  });

  describe(CarAction.ADD_CAR, () => {

    const carToAdd: Car = {
      brand: 'going',
      model: 'to',
      year: 'be',
      condition: 'added'
    };

    it('Will add car to the state', () => {

      store.dispatch(ActionFactory.listCars(carsPayload));

      store.dispatch(ActionFactory.addCar(carToAdd));

      expect(subscribedCars).to.equal([...carsPayload, carToAdd]);
    });
  });

});
