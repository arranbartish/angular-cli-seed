import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {cars} from './car/reducers/car.reducer';
import {expect} from 'chai';

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

    expect(component).to.exist;
  }));

  it('demonstrate how to interrogate the DOM', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const content = compiled.querySelector('h1').textContent;
    expect(content).to.include('Listing search POC');
  }));

  it('will load navigation elements', async(() => {

    expect(component.treeElements.length).to.equal(4);
    expect(component.treeElements[0].title).to.equal('Home');
    expect(component.treeElements[1].title).to.equal('Search');
  }));

});
