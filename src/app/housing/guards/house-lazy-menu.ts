import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuState, MenuActionFactory, TreeElement } from 'arranbartish-angular-cli-widgets';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { House, HousesState } from '../domain/housing';

@Injectable()
export class HousesLazyMenuGuard implements CanActivate {

  constructor(private menuStore: Store<MenuState>,
              private housesStore: Store<HousesState>) {
  }

  initializeMenu(): Observable<boolean> {
    this.housesStore.select(state => state.houses).subscribe((housingItems: House[]) => {
      const newMenuItems = housingItems
        .map(house => house.country) // Linq: .Select(house => house.country)
        .filter((value, index, array) => array.indexOf(value) === index) // Linq: .Distinct()
        .map(country => <TreeElement>{
          title: country,
          targetUrl: '/housing/search?q=' + country,
          imageCssClass: 'glyphicon glyphicon-list'
        })
        .sort((treeElmA, treeElmB) => treeElmA.title > treeElmB.title ? 1 : 0);

      const housingMenuTitle = 'Housing';
      const housingMenu = {
        title: housingMenuTitle,
        targetUrl: '/housing',
        imageCssClass: 'glyphicon-home',
        children: [
          { title: 'Search houses', targetUrl: '/housing/search', imageCssClass: 'glyphicon glyphicon-search' },
          ...newMenuItems
        ]
      };

      this.menuStore.select(state => state.treeElements).subscribe((menuItems: TreeElement[]) => {
        let theHousingItemIndex = -1;
        menuItems.filter((value: TreeElement, index: number) => {
          theHousingItemIndex = value.title === housingMenuTitle ? index : theHousingItemIndex;
          return value.title === housingMenuTitle;
        });

        if (theHousingItemIndex === -1) {
          this.menuStore.dispatch(MenuActionFactory.addMenuItems([housingMenu]));
        } else {
          menuItems[theHousingItemIndex] = housingMenu;
          this.menuStore.dispatch(MenuActionFactory.setMenuItems(menuItems));
        }
      });
    });

    return of(true);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.initializeMenu();
  }
}
