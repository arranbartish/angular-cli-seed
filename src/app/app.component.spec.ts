import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {expect} from 'chai';

describe('AppComponent', () => {
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).to.exist;
  }));

  it(`should have as title 'app works!'`, async(() => {
    expect(app.title).to.include('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).to.include('app works!');
  }));
});
