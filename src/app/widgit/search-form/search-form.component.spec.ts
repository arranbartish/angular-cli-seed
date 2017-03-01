import {async, ComponentFixture, TestBed, fakeAsync, tick, inject} from '@angular/core/testing';
import {SearchFormComponent, UNDEFINED_NAME, DEFAULT_TARGET} from './search-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchFormService} from './search-form.service';
import {Router} from '@angular/router';
import {UtilitiesModule} from '../../utilities/utilities.module';
import {SearchOptions} from './search-options';


describe('SearchFormComponent', () => {
  let component: SearchFormComponent;

  let fixture: ComponentFixture<SearchFormComponent>;

  let mockSearchFormService: SearchFormService;
  let mockRouter: Router;

  const undefinedDefaultConfigurtion: SearchOptions = {
    name: UNDEFINED_NAME,
    target: DEFAULT_TARGET
  };

  const expectedOptions: SearchOptions = {
    name: 'unit-test',
    target: './some-path'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFormService,
          useClass: class {
            registerMe = jasmine.createSpy('registerMe');
            searchDone = jasmine.createSpy('searchDone');
          }
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ],
      imports: [FormsModule, ReactiveFormsModule, UtilitiesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([SearchFormService, Router], (searchFormService: SearchFormService, router: Router) => {
      mockSearchFormService = searchFormService;
      mockRouter = router;
  }));

  it('will be defined', () => {
    expect(component).toBeDefined();
  });


  it('will have configured options with undefined defaults', () => {
      expect(component.configuredOptions).toEqual(undefinedDefaultConfigurtion);
  });

  describe('initialisation', () => {

    it('will keep default configuration when no options are provided', () => {
      component.ngOnInit();
      expect(component.configuredOptions).toEqual(undefinedDefaultConfigurtion);
    });

    it('will apply configuration provided as options', () => {
      component.options = expectedOptions;

      component.ngOnInit();

      expect(component.configuredOptions).toEqual(expectedOptions);
    });

    it('will have an invalid form by default', () => {

      component.ngOnInit();

      expect(component.searchForm.valid).toBeFalsy();
    });
  });

  describe('search', () => {

    beforeEach(() => {
      component.options = expectedOptions;
      component.ngOnInit();
    });

    describe('when no valid input is provided', () => {

      it('will be able to be called and not execute a search', () => {
        component.search();
        expect(mockSearchFormService.searchDone).not.toHaveBeenCalled();
      });

      it('will be able to be called and navigate away', () => {
        component.search();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
      });

    });

    describe('when valid input is provided', () => {

      const searchTerm = 'find-me';
      const expectedQueryParameters = {queryParams: {q : searchTerm}};

      beforeEach(() => {
        component.terms = searchTerm;
        fixture.detectChanges();
      });

      it('will define the form to be valid', () => {
        expect(component.searchForm.valid).toBeTruthy();
      });

      it('will execute a search', () => {
        component.search();
        expect(mockSearchFormService.searchDone).toHaveBeenCalledWith(expectedOptions.name, searchTerm);
      });

      it('will navigate to the configured target', () => {
        component.search();
        expect(mockRouter.navigate).toHaveBeenCalledWith([expectedOptions.target], expectedQueryParameters);
      });

    });

  });

});
