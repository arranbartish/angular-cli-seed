import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {SearchFormService} from "./search-form.service";
import {SearchOptions} from "./search-options";
import {ObjectService} from "../../utilities/object.service";

export const UNDEFINED_NAME : string = 'SearchFormComponent_name_unspecified';
export const DEFAULT_TARGET : string = './search';


@Component({
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
  styleUrls: ['search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Input() terms: string;
  @Input() options: SearchOptions;
  configuredOptions: SearchOptions = {
    name: UNDEFINED_NAME,
    target: DEFAULT_TARGET
  };

  searchForm = this.formBuilder.group({
    terms: [this.terms, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private searchFormService: SearchFormService,
              private objectService : ObjectService) { }

  ngOnInit() {


    if (!!this.options) {
       this.configuredOptions = this.objectService.shallowCopy(this.configuredOptions, this.options);
    }

    this.configuredOptions.name = !!(this.configuredOptions.name) ? this.configuredOptions.name : UNDEFINED_NAME;
    this.configuredOptions.target = !!(this.configuredOptions.target) ? this.configuredOptions.target : DEFAULT_TARGET;
  }

  search() {
    if(!this.searchForm.valid){
      return;
    }
    this.searchFormService.searchDone(this.configuredOptions.name, this.terms);
    this.router.navigate([this.configuredOptions.target], {queryParams: {q : this.terms}});
  }

}
