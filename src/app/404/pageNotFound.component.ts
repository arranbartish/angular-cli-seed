import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pageNotFound',
  templateUrl: './pageNotFound.component.html'
})
export class PageNotFoundComponent implements OnInit {
  public constructor(private location: Location) {
  }

  public ngOnInit() {
  }

  public goBack(): void {
    this.location.back();
  }
}
