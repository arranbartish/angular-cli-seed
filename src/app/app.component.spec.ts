import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { expect } from 'chai';

import { AppComponent } from './app.component';
import { cars } from './car/reducers/car.reducer';

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

});
