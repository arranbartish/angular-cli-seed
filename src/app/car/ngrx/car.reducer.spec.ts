import {Car, CarAction} from '../domain/car';
import {Action} from '@ngrx/store';
import {car} from './car.reducer';

describe('car reducer', () => {

  const cars: Car[] = [
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

  describe(CarAction[CarAction.SET_CARS], () => {

    it('will return array that is the same as the payload when the state is empty', () => {
      const action: Action = {
        type: CarAction[CarAction.SET_CARS],
        payload: cars
      };
      expect(car([], action)).toEqual(cars);
    });

    it('will return array removes existing values when state is not empty', () => {
      const action: Action = {
        type: CarAction[CarAction.SET_CARS],
        payload: cars
      };
      const currentState: Car[] = [{brand: 'going',
        model: 'to',
        year: 'be',
        condition: 'removed'}];
      expect(car(currentState, action)).toEqual(cars);
    });

  });

  describe('Some random string', () => {

    it('will not do anything to the state', () => {
      const action: Action = {
        type: 'some random string',
        payload: []
      };
      expect(car(cars, action)).toEqual(cars);
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
      expect(car(cars, action)).toEqual([...cars, carToAdd]);
    });
  });

});
