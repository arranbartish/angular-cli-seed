import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
    
    constructor(private _store: Store<any>) {
    }

    ngOnInit() {
      this.treeElements = [
        { title: 'Home', targetUrl: '/home', imageCssClass: 'glyphicon-home' },
        { title: 'Search', targetUrl: '/search', imageCssClass: 'glyphicon-search' },
        { title: 'Car', targetUrl: '/car', imageCssClass: 'glyphicon-road' }
      ];
    }
}
