import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CarRouteModule} from './car/car.route';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {cars} from './car/reducers/car.reducer';

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.provideStore({ cars })],
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

  it('will load navigation elements', async(() => {

    expect(component.treeElements.length).toBe(3);
    expect(component.treeElements[0].title).toBe('Home');
    expect(component.treeElements[1].title).toBe('Search');
  }));

});
