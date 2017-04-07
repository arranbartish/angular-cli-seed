import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HouseEditComponent } from './house-edit.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { expect } from 'chai';

describe('HouseListComponent', () => {
  let component: HouseEditComponent;
  let fixture: ComponentFixture<HouseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [HouseEditComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('will be defined', () => {
    expect(component).to.exist;
  });

});
