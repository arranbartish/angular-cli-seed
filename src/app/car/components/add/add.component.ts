import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.scss']
})
export class AddComponent implements OnInit {

  addForm = this.formBuilder.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', Validators.required],
    condition: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
