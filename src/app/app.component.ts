import { Component, OnInit } from '@angular/core';
import { TreeElement } from 'arranbartish-angular-cli-widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public treeElements: TreeElement[];

  constructor() {
  }

  ngOnInit() {
    this.treeElements = [
      { title: 'Home', targetUrl: '/home', imageCssClass: 'glyphicon-globe' },
      { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' },
      { title: 'Car', targetUrl: '/car', imageCssClass: 'glyphicon-road' },
      { title: 'Housing', targetUrl: '/housing', imageCssClass: 'glyphicon-home' }
    ];
  }
}
