import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { House } from '../../domain/housing';

@Component({
  selector: 'app-house-edit',
  templateUrl: 'house-edit.component.html',
  styleUrls: ['house-edit.component.scss']
})
export class HouseEditComponent implements OnInit {

  @Input()
  public house: House;

  @Output()
  public houseCreated: EventEmitter<House>;

  @Output()
  public houseUpdated: EventEmitter<House>;

  public currentYear: number;

  public countryCtrl: FormControl;
  public stateCtrl: FormControl;
  public cityCtrl: FormControl;
  public constructionCtrl: FormControl;
  public roomsCtrl: FormControl;
  public houseFrmGrp: FormGroup;

  public inEditMode: boolean;

  public constructor(private formBuilder: FormBuilder) {
    this.house = this.defaultHouseEntity();
    this.houseCreated = new EventEmitter<House>();
    this.houseUpdated = new EventEmitter<House>();

    this.currentYear = new Date().getFullYear();

    this.countryCtrl = new FormControl(this.house.country, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]);
    this.stateCtrl = new FormControl(this.house.state, Validators.required);
    this.cityCtrl = new FormControl(this.house.city, Validators.required);
    this.constructionCtrl = new FormControl(this.house.construction,
                                         [Validators.required, CustomValidators.number, CustomValidators.range([1900, this.currentYear])]);
    this.roomsCtrl = new FormControl(this.house.rooms, [Validators.required, CustomValidators.number, CustomValidators.range([1, 5])]);
    this.houseFrmGrp = this.formBuilder.group({
      countryCtrlName: this.countryCtrl,
      stateCtrlName: this.stateCtrl,
      cityCtrlName: this.cityCtrl,
      constructionCtrlName: this.constructionCtrl,
      roomsCtrlName: this.roomsCtrl
    });
  }

  ngOnInit() {
    this.inEditMode = typeof this.house !== typeof undefined
                   && this.house.rooms !== -1;
  }

  public submitHouseEdit() {
    if (!this.houseFrmGrp.valid) {
      return;
    }

    if (this.inEditMode) {
      this.houseUpdated.emit(this.house);
    } else {
      this.houseCreated.emit(this.house);
      this.house = this.defaultHouseEntity();
      this.houseFrmGrp.reset();
    }
  }

  private defaultHouseEntity(): House {
    return { country: '', state: '', city: '', construction: '', rooms: -1 };
  }
}
