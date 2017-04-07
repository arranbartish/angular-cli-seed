import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public houseForm: FormGroup;

  public currentYear: number;

  public inEditMode: boolean;

  public constructor(private formBuilder: FormBuilder) {
    this.house = this.defaultHouseEntity();
    this.houseCreated = new EventEmitter<House>();
    this.houseUpdated = new EventEmitter<House>();

    this.currentYear = new Date().getFullYear();

    this.houseForm = this.formBuilder.group({
      country: [this.house.country, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      state: [this.house.state, Validators.required],
      city: [this.house.city, Validators.required],
      construction: [this.house.construction, [Validators.required, CustomValidators.range([1900, this.currentYear])]],
      rooms: [this.house.rooms, [Validators.required, CustomValidators.range([1, 5])]]
    });
  }

  ngOnInit() {
    this.inEditMode = typeof this.house !== typeof undefined
                   && this.house.rooms !== -1;
  }

  public submitHouseEdit() {
    if (!this.houseForm.valid) {
      return;
    }

    if (this.inEditMode) {
      this.houseUpdated.emit(this.house);
    } else {
      this.houseCreated.emit(this.house);
      this.house = this.defaultHouseEntity();
    }
  }

  private defaultHouseEntity(): House {
    return { country: '', state: '', city: '', construction: '', rooms: -1 };
  }

}
