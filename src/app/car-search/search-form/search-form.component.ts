import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  public searchForm = this.formBuilder.group({
    terms: ['', Validators.required]
  });

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  search(event) {
    debugger;
    console.log(event);
  }

}
