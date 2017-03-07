import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SearchOptions} from './search-options';
import {ObjectService} from '../../utilities/object.service';

export const UNDEFINED_NAME = 'SearchFormComponent_name_unspecified';
export const DEFAULT_TARGET = './search';


@Component({
  selector: 'app-search-form',
  templateUrl: 'search-form.component.html',
  styleUrls: ['search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  // this component sucks. Update it to use
  // https://toddmotto.com/component-events-event-emitter-output-angular-2

  terms: string;
  @Input() options: SearchOptions;
  @Output() searchedTerms: EventEmitter<string>;

  configuredOptions: SearchOptions = {
    name: UNDEFINED_NAME,
    target: DEFAULT_TARGET
  };

  searchForm = this.formBuilder.group({
    terms: [this.terms, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private objectService: ObjectService) {
    this.searchedTerms = new EventEmitter<string>();
  }

  ngOnInit() {

    if (!!this.options) {
      this.configuredOptions = this.objectService.shallowCopy(this.configuredOptions, this.options);
    }

  }

  search() {
    if (!this.searchForm.valid) {
      return;
    }
    this.searchedTerms.emit(this.terms);
    this.router.navigate([this.configuredOptions.target], {queryParams: {q : this.terms}});
  }

}
