import { BloodDonation } from './../models/blood-donation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BloodDonationSpecService {

  private _bloodGroupMatch: {
    group: BloodDonation[];
  };

  get bloodGroupMatch() {
    return this._bloodGroupMatch;
  }

  constructor() {
    this._bloodGroupMatch = { group: [] };
  }
}
