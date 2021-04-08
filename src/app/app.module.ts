import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { BloodGroupInfoFormComponent } from './blood-group-info-form/blood-group-info-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BloodRequirementFormComponent } from './blood-requirement-form/blood-requirement-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BloodBankComponent,
    BloodGroupInfoFormComponent,
    BloodRequirementFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
