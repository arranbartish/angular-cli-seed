import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseEditComponent } from './house-edit.component';
import {expect} from 'chai';

describe('HouseListComponent', () => {
  let component: HouseEditComponent;
  let fixture: ComponentFixture<HouseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('will be defined', sinon.test(() => {
    expect(component).to.exist;
  }));

});
