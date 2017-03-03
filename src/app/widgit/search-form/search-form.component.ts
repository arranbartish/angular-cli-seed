import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {SearchOptions} from './search-options';
import {ObjectService} from '../../utilities/object.service';
import {SearchAction} from './domain/search-event';

export const UNDEFINED_NAME = 'SearchFormComponent_name_unspecified';
export const DEFAULT_TARGET = './search';


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
              private objectService: ObjectService) { }

  ngOnInit() {


    if (!!this.options) {
      this.configuredOptions = this.objectService.shallowCopy(this.configuredOptions, this.options);
      this.configuredOptions.store = this.options.store;
    }

    this.configuredOptions.name = !!(this.configuredOptions.name) ? this.configuredOptions.name : UNDEFINED_NAME;
    this.configuredOptions.target = !!(this.configuredOptions.target) ? this.configuredOptions.target : DEFAULT_TARGET;
  }

  search() {
    if (!this.searchForm.valid) {
      return;
    }
    if (this.options.store) {
      this.options.store.dispatch({
        type: SearchAction[SearchAction.CHANGE_TERM],
        payload: this.terms
      });
    }
    this.router.navigate([this.configuredOptions.target], {queryParams: {q : this.terms}});
  }

}
