import { Component, OnInit } from '@angular/core';

import { TreeElement } from './widgit/navigation/valueObject/treeElement';
import { TreeNode } from './widgit/navigation/valueObject/treeNode';
import { TreeLeaf } from './widgit/navigation/valueObject/treeLeaf';

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
        { title: 'Register', targetUrl: '/register/0', imageCssClass: 'glyphicon-user' },
        { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' },
        { title: 'Car', targetUrl: '/car', imageCssClass: 'glyphicon-road' },
        { title: 'Housing', targetUrl: '/housing', imageCssClass: 'glyphicon-home' }
      ];
    }
}
