import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, range } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-blood-requirement-form',
  templateUrl: './blood-requirement-form.component.html',
  styleUrls: ['./blood-requirement-form.component.css']
})
export class BloodRequirementFormComponent implements OnInit {

  numberOfBottles: Observable<number[]>;
  bloodRequirementFormGroup: FormGroup;
  @Output() bloodRequiredData;

  constructor(private formBuilder: FormBuilder) {
    this.bloodRequiredData = new EventEmitter();
  }

  ngOnInit(): void {
    this.numberOfBottles  = range(1, 50).pipe(toArray());
    
    this.bloodRequirementFormGroup = this.formBuilder.group({
      bloodGroupRequired: ['', Validators.required],
      numberOfBottle: [0, Validators.required]
    });
  }

  onSubmit(formData: FormGroup) {
    this.bloodRequiredData.emit(formData.value);
  }
}
