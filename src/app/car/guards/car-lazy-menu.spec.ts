import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MenuState, MenuActionFactory, TreeElement, treeElements } from 'arranbartish-angular-cli-widgets';
import { expect } from 'chai';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CarsLazyMenuGuard } from './car-lazy-menu';
import { ActionFactory } from '../actions/cars';
import { Car, CarState } from '../domain/car';
import { CarModule } from '../car.module';
import { cars } from '../reducers/car.reducer';

describe('HousesLazyMenuGuard', () => {
  class MenuStore extends Store<MenuState> {
  }

  class CarStore extends Store<CarState> {
  }

  let guard: CarsLazyMenuGuard;
  let menuStore: Store<MenuState>;
  let subscribedMenuItems: TreeElement[];

  let carStore: Store<CarState>;
  let subscribedCars: Car[];

  const mockResponseMenu: TreeElement[] = [
      { title: 'Search root', targetUrl: '/something/overview', imageCssClass: 'glyphicon glyphicon-home' },
      { title: 'Search something', targetUrl: '/something/search', imageCssClass: 'glyphicon glyphicon-search' },
  ];

  const mockResponseCar: Car[] = [
    { brand: 'Toyota', model: 'Camery', year: '2011', condition: 'Awesome' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarModule, StoreModule.provideStore({ cars, treeElements })],
      providers: [
        {
          provide: MenuStore,
          useClass: class <Store> { dispatch = sinon.stub(); select = () => of(mockResponseMenu); }
        },
        {
          provide: CarStore,
          useClass: class <Store> { dispatch = sinon.stub(); select = () => of(mockResponseCar); }
        }
      ]
    });
  });

  beforeEach(inject([CarsLazyMenuGuard, MenuStore, CarStore],
                   (carsLazyMenuGuard: CarsLazyMenuGuard, _menuStore: MenuStore, _carStore: CarStore) => {
    guard = carsLazyMenuGuard;
    menuStore = _menuStore;
    carStore = _carStore;
  }));

  beforeEach(() => {
    menuStore.select(state => state.treeElements)
             .subscribe(menuItemList => subscribedMenuItems = menuItemList);
    menuStore.dispatch(MenuActionFactory.setMenuItems([]));

    carStore.select(state => state.cars)
               .subscribe(carList => subscribedCars = carList);
    carStore.dispatch(ActionFactory.clearCars());
  });

  describe('when response comes from Store<CarState>', () => {
    it('will ensure menu items are inserted', () => {
      const expected = [
        {
          title: 'Car',
          targetUrl: '/car',
          imageCssClass: 'glyphicon-road',
          children: [
            { title: 'Search cars', targetUrl: '/car/search', imageCssClass: 'glyphicon glyphicon-search' },
            { title: mockResponseCar[0].brand,
              targetUrl: '/housing/search?q=' + mockResponseCar[0].brand,
              imageCssClass: 'glyphicon glyphicon-list' }
          ]
        }
      ];

      guard.canActivate(null).subscribe();
      expect((menuStore.dispatch as sinon.SinonStub).called).to.be.true;
      // expect((menuStore.dispatch as sinon.SinonStub).calledWithExactly(
      //   MenuActionFactory.addMenuItems(expected))).to.be.true;
    });

    it('will allow activation', () => {
      let result = false;
      guard.canActivate(null).subscribe(value => result = value);
      expect(result).to.be.ok;
    });
  });
});
