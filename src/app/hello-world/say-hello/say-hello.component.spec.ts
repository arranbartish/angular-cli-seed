import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SayHelloComponent } from './say-hello.component';

describe('SayHelloComponent', () => {
  let component: SayHelloComponent;
  let fixture: ComponentFixture<SayHelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SayHelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SayHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
