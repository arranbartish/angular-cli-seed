import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CarRouteModule} from './car/car.route';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {car} from './car/ngrx/car.reducer';

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.provideStore({car})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('will be defined', async(() => {

    expect(component).toBeDefined();
  }));

  it('demonstrate how to interrogate the DOM', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Car search POC');
  }));
});
