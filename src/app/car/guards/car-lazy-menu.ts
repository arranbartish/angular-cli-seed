import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuState, MenuActionFactory, TreeElement } from 'arranbartish-angular-cli-widgets';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Car, CarState } from '../domain/car';

@Injectable()
export class CarsLazyMenuGuard implements CanActivate {

  constructor(private menuStore: Store<MenuState>,
              private carStore: Store<CarState>) {
  }

  initializeMenu(): Observable<boolean> {
    this.carStore.select(state => state.cars).subscribe((carItems: Car[]) => {
      const newMenuItems = carItems
        .map(car => car.brand) // Linq: .Select(car => car.brand)
        .filter((value, index, array) => array.indexOf(value) === index) // Linq: .Distinct()
        .map(brand => <TreeElement> {
          title: brand,
          targetUrl: '/car/search?q=' + brand,
          imageCssClass: 'glyphicon glyphicon-list'
        })
        .sort((treeElmA, treeElmB) => treeElmA.title > treeElmB.title ? 1 : 0);

      const carMenuTitle = 'Car';
      const carMenu = {
        title: carMenuTitle,
        targetUrl: '/car',
        imageCssClass: 'glyphicon-road',
        children: [
          { title: 'Search cars', targetUrl: '/car/search', imageCssClass: 'glyphicon glyphicon-search' },
          ...newMenuItems
        ]
      };

      this.menuStore.select(state => state.treeElements).subscribe((menuItems: TreeElement[]) => {
        let theCarItemIndex = -1;
        menuItems.filter((value: TreeElement, index: number) => {
          theCarItemIndex = value.title === carMenuTitle ? index : theCarItemIndex;
          return value.title === carMenuTitle;
        });

        if (theCarItemIndex === -1) {
          this.menuStore.dispatch(MenuActionFactory.addMenuItems([carMenu]));
        } else {
          menuItems[theCarItemIndex] = carMenu;
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
