import { expect } from 'chai';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationComponent} from './navigation.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ NavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('will be created', sinon.test(() => {
    expect(component).to.exist;
  }));

  it('will init tree element array', sinon.test(() => {
    expect(component.treeElements.length).to.equal(0);
  }));
});
