import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuState, MenuActionFactory, TreeElement } from 'arranbartish-angular-cli-widgets';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { House, HousesState } from '../domain/housing';
import { HouseService } from '../service/house.service';

@Injectable()
export class HousesLazyMenuGuard implements CanActivate {

  constructor(private menuStore: Store<MenuState>,
    private houseService: HouseService) {
  }

  initializeMenu(): Observable<boolean> {
    var housingItems: House[] = [];
    //this.housesStore.select(state => state.houses).subscribe((value: House[]) => housingItems = value);
    this.houseService.getHouses().map((value: House[]) => housingItems = value);

    const housingMenuTitle = 'Housing';
    var housingMenu = {
      title: housingMenuTitle,
      targetUrl: '/housing',
      imageCssClass: 'glyphicon-home',
      children: [
        { title: 'Search houses', targetUrl: '/housing/search', imageCssClass: 'glyphicon glyphicon-search' },
        ...(housingItems.map(house => <TreeElement>{ title: house.country, targetUrl: '/housing/search?q=' + house.country, imageCssClass: 'glyphicon glyphicon-list' }))
      ]
    };

    var menuItems: TreeElement[] = [];
    this.menuStore.select(state => state.treeElements).subscribe((value: TreeElement[]) => menuItems = value);

    var theHousingItemIndex = -1;
    menuItems.filter((value: TreeElement, index: number) => {
      if (value.title === housingMenuTitle) theHousingItemIndex = index;
      return value.title === housingMenuTitle;
    });

    if (theHousingItemIndex == -1) {
      this.menuStore.dispatch(MenuActionFactory.addMenuItems([housingMenu]));
    }
    else {
      menuItems[theHousingItemIndex] = housingMenu;
      this.menuStore.dispatch(MenuActionFactory.setMenuItems(menuItems));
    }

    return of(true);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.initializeMenu();
  }
}
