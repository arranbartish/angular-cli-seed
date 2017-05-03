import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TreeElement, NavigationComponent, MenuState, MenuActionFactory } from 'arranbartish-angular-cli-widgets';

@Component({
  selector: 'app-specific-navigation',
  template: '<app-navigation></app-navigation>'
})
export class AppNavigationComponent implements OnInit {
  @ViewChild(NavigationComponent)
  private childNavigationComponent: NavigationComponent;

  constructor(private menuStore: Store<MenuState>) {
  }

  ngOnInit() {
    this.menuStore.select(state => state.treeElements).subscribe(treeElements => this.childNavigationComponent.treeElements = treeElements);

    if (!this.childNavigationComponent.treeElements.length) {
      this.menuStore.dispatch(MenuActionFactory.addMenuItems([
        { title: 'Home', targetUrl: '/home', imageCssClass: 'glyphicon-globe' } as TreeElement,
        { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' } as TreeElement,
        { title: 'Car', targetUrl: '/car', imageCssClass: 'glyphicon-road', children: [] } as TreeElement,
        { title: 'Housing', targetUrl: '/housing', imageCssClass: 'glyphicon-home', children: [] } as TreeElement
      ]));
    }
  }
}
