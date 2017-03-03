import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

import { TreeElement } from './valueObject/treeElement';
import { TreeNode } from './valueObject/treeNode';
import { TreeLeaf } from './valueObject/treeLeaf';

@Component({
    selector: 'nav-item',
    templateUrl: './navigation-item.component.html'
})
export class NavigationItemComponent {
    @Input('treeElements')
    public treeElements: TreeElement[];

    constructor(private location: Location) {
    }

    public isNode(treeElmt: TreeElement): boolean {
        return typeof (treeElmt as TreeNode).children !== 'undefined';
    }

    public asNode(treeElmt: TreeElement): TreeNode {
        return this.isNode(treeElmt) ? (treeElmt as TreeNode) : null;
    }

    public isActiveNavItem(treeElmt: TreeElement): boolean {
        return treeElmt.targetUrl === this.location.path();
    }
}
