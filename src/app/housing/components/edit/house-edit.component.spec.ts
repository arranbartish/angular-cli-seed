import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { expect } from 'chai';
import * as moment from 'moment';
import { HouseEditComponent } from './house-edit.component';
import { House } from '../../domain/housing';

describe('HouseListComponent', () => {
  let component: HouseEditComponent;
  let fixture: ComponentFixture<HouseEditComponent>;
  const defaultHouseEntity: House = { country: '', state: '', city: '', construction: '', rooms: -1 };
  const validSampleHouseEntity: House = { country: 'the-country', state: 'the-state', city: 'the-city', construction: '1955', rooms: 1 };
  const invalidSampleHouseEntity: House = { country: '.', state: '', city: '', construction: 'abc', rooms: 11111 };

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

  it('will have default house entity set, when none was specified', () => {
    expect(component.house).to.eql(defaultHouseEntity);
    expect(component.inEditMode).to.eql(false);
  });

  it('will have a house entity set, when one was specified', () => {
    component.house = validSampleHouseEntity;
    component.ngOnInit();

    expect(component.house).to.not.eql(defaultHouseEntity);
    expect(component.inEditMode).to.eql(true);
  });

  it('will have currentYear property set to today\'s year', () => {
    expect(component.currentYear).to.eql(moment().year());
  });

  describe('when valid input is provided (while in create mode)', () => {
    let subscribedCreatedHouse: House;
    let subscribedUpdatedHouse: House;

    beforeEach(() => {
      component.inEditMode = false;
      component.house = validSampleHouseEntity;
      fixture.detectChanges();
    });

    it('will define the form to be valid', () => {
      expect(component.houseFrmGrp.valid).to.be.ok;
    });

    it('will raise a houseCreated event', () => {
      component.houseCreated.subscribe(event => subscribedCreatedHouse = event);
      component.houseUpdated.subscribe(event => subscribedUpdatedHouse = event);
      component.submitHouseEdit();
      expect(subscribedCreatedHouse).to.equal(validSampleHouseEntity);
      expect(subscribedUpdatedHouse).to.be.undefined;
    });
  });

  describe('when INvalid input is provided (while in create mode)', () => {
    let subscribedCreatedHouse: House;
    let subscribedUpdatedHouse: House;

    beforeEach(() => {
      component.inEditMode = false;
      component.house = invalidSampleHouseEntity;
      fixture.detectChanges();
    });

    it('will define the form to be invalid', () => {
      expect(component.houseFrmGrp.valid).to.be.not.ok;
    });

    it('will define the countryCtrl to be invalid', () => {
      expect(component.countryCtrl.valid).to.be.not.ok;
      expect(component.countryCtrl.errors.minlength).to.be.ok;
    });

    it('will define the stateCtrl to be invalid', () => {
      expect(component.stateCtrl.valid).to.be.not.ok;
      expect(component.stateCtrl.errors.required).to.be.ok;
    });

    it('will define the cityCtrl to be invalid', () => {
      expect(component.cityCtrl.valid).to.be.not.ok;
      expect(component.cityCtrl.errors.required).to.be.ok;
    });

    it('will define the constructionCtrl to be invalid', () => {
      expect(component.constructionCtrl.valid).to.be.not.ok;
      expect(component.constructionCtrl.errors.number).to.be.ok;
    });

    it('will define the roomsCtrl to be invalid', () => {
      expect(component.roomsCtrl.valid).to.be.not.ok;
      expect(component.roomsCtrl.errors.range).to.be.ok;
    });

    it('will not raise a houseCreated event', () => {
      component.houseCreated.subscribe(event => subscribedCreatedHouse = event);
      component.houseUpdated.subscribe(event => subscribedUpdatedHouse = event);
      component.submitHouseEdit();
      expect(subscribedCreatedHouse).to.be.undefined;
      expect(subscribedUpdatedHouse).to.be.undefined;
    });
  });

  describe('when valid input is provided (while in edit mode)', () => {
    let subscribedCreatedHouse: House;
    let subscribedUpdatedHouse: House;

    beforeEach(() => {
      component.inEditMode = true;
      component.house = validSampleHouseEntity;
      fixture.detectChanges();
    });

    it('will raise a houseCreated event', () => {
      component.houseCreated.subscribe(event => subscribedCreatedHouse = event);
      component.houseUpdated.subscribe(event => subscribedUpdatedHouse = event);
      component.submitHouseEdit();
      expect(subscribedCreatedHouse).to.be.undefined;
      expect(subscribedUpdatedHouse).to.equal(validSampleHouseEntity);
    });
  });

});
