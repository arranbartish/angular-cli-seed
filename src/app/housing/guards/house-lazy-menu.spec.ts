import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MenuState, MenuActionFactory, TreeElement, treeElements } from 'arranbartish-angular-cli-widgets';
import { expect } from 'chai';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HousesLazyMenuGuard } from './house-lazy-menu';
import { ActionFactory } from '../actions/housing';
import { House, HousesState } from '../domain/housing';
import { HousingModule } from '../housing.module';
import { houses } from '../reducers/houses.reducer';

describe('HousesLazyMenuGuard', () => {
  class MenuStore extends Store<MenuState> {
  }

  class HousesStore extends Store<HousesState> {
  }

  let guard: HousesLazyMenuGuard;
  let menuStore: Store<MenuState>;
  let subscribedMenuItems: TreeElement[];

  let housesStore: Store<HousesState>;
  let subscribedHouses: House[];

  const mockResponseMenu: TreeElement[] = [
      { title: 'Search root', targetUrl: '/something/overview', imageCssClass: 'glyphicon glyphicon-home' },
      { title: 'Search something', targetUrl: '/something/search', imageCssClass: 'glyphicon glyphicon-search' },
  ];

  const mockResponseHouse: House[] = [
    { country: 'Australia', state: 'Victoria', city: 'Melbourne', construction: '1983', rooms: 6 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HousingModule, StoreModule.provideStore({ houses, treeElements })],
      providers: [
        {
          provide: MenuStore,
          useClass: class <Store> { dispatch = sinon.stub(); select = () => of(mockResponseMenu); }
        },
        {
          provide: HousesStore,
          useClass: class <Store> { dispatch = sinon.stub(); select = () => of(mockResponseHouse); }
        }
      ]
    });
  });

  beforeEach(inject([HousesLazyMenuGuard, MenuStore, HousesStore],
                   (housesLazyMenuGuard: HousesLazyMenuGuard, _menuStore: MenuStore, _housesStore: HousesStore) => {
    guard = housesLazyMenuGuard;
    menuStore = _menuStore;
    housesStore = _housesStore;
  }));

  beforeEach(() => {
    menuStore.select(state => state.treeElements)
             .subscribe(menuItemList => subscribedMenuItems = menuItemList);
    menuStore.dispatch(MenuActionFactory.setMenuItems([]));

    housesStore.select(state => state.houses)
               .subscribe(houseList => subscribedHouses = houseList);
    housesStore.dispatch(ActionFactory.clearHouses());
  });

  describe('when response comes from Store<HousesState>', () => {
    it('will ensure menu items are inserted', () => {
      const expected = [
        {
          title: 'Housing',
          targetUrl: '/housing',
          imageCssClass: 'glyphicon-home',
          children: [
            { title: 'Search houses', targetUrl: '/housing/search', imageCssClass: 'glyphicon glyphicon-search' },
            { title: mockResponseHouse[0].country,
              targetUrl: '/housing/search?q=' + mockResponseHouse[0].country,
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
