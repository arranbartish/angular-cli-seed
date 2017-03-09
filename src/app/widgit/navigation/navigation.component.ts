import { Component, Input } from '@angular/core';

import { TreeElement } from './valueObject/treeElement';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    @Input()
    public treeElements: TreeElement[];

    constructor() {
        this.treeElements = [];
    }
}
