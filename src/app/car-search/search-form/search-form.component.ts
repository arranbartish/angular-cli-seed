import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() public terms: string;
  public searchForm = this.formBuilder.group({
    terms: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  search() {
    if(this.searchForm.valid) {
      this.router.navigate(['./search'], {queryParams: {q : this.terms}});
    }
  }

}
