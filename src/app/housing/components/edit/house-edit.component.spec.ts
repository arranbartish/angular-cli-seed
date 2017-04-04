import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { HouseEditComponent } from './house-edit.component';

describe('HouseListComponent', () => {
  let component: HouseEditComponent;
  let fixture: ComponentFixture<HouseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HouseEditComponent]
    }).compileComponents();
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
