import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { BloodGroupInfoFormComponent } from './blood-group-info-form/blood-group-info-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',  component: BloodGroupInfoFormComponent },
  { path: 'bloodBank', component: BloodBankComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
