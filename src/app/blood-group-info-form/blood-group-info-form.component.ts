import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blood-group-info-form',
  templateUrl: './blood-group-info-form.component.html',
  styleUrls: ['./blood-group-info-form.component.css']
})
export class BloodGroupInfoFormComponent implements OnInit {

  @Output() closeForm;
  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    this.closeForm = new EventEmitter();
  }

  formGroup: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'A+': [0, Validators.required],
      'B+': [0, Validators.required],
      'O+': [0, Validators.required],
      'AB+': [0, Validators.required],
      'A-': [0, Validators.required],
      'B-': [0, Validators.required],
      'O-': [0, Validators.required],
      'AB-': [0, Validators.required]
    });
  }

  onSubmit(formData: FormGroup) {
    this.closeForm.emit({
      index: 1,
      formData: formData.value
    });
  }
}
