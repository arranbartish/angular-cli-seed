import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseListComponent } from './house-list.component';
import {expect} from 'chai';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('will be defined', sinon.test(() => {
    expect(component).to.exist;
  }));

});
