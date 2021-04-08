import {
  DonatedBlood
} from './../models/donated-blood';
import {
  Component,
  OnInit
} from '@angular/core';
import * as data from '../blood-group-donation-criteria.json';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css']
})
export class BloodBankComponent implements OnInit {

  tabIndex: number;
  bloodDonationCriteriaData: any;

  bloodGroupRequired: string;
  numberOfBottlesRequired: number;


  _bloodBankData: {
    positiveBloodData: DonatedBlood[],
    negativeBloodData: DonatedBlood[]
  };

  constructor() {
    this._bloodBankData = {
      positiveBloodData: [],
      negativeBloodData: []
    };
  }

  get bloodBankData() {
    return this._bloodBankData;
  }

  ngOnInit() {
    this.bloodDonationCriteriaData = data.data as any;
  }

  nextTab(event) {
    this.tabIndex = event.index;

    for (const key in (event.formData)) {

      if (event.formData.hasOwnProperty(key)) {

        if (key.endsWith('+')) {

          this._bloodBankData.positiveBloodData.push(
            new DonatedBlood(key, event.formData[key], false)
          );
        } else if (key.endsWith('-')) {

          this._bloodBankData.negativeBloodData.push(
            new DonatedBlood(key, event.formData[key], false)
          );
        }
      }
    }

    console.log(this.bloodBankData);
  }

  checkBloodGroupAvailibility(bloodGroupRequiredData) {

    const permittedBloodGroup = [];

    this.bloodGroupRequired = bloodGroupRequiredData.bloodGroupRequired;
    this.numberOfBottlesRequired = bloodGroupRequiredData.numberOfBottle;

    permittedBloodGroup.push(this.bloodDonationCriteriaData[this.bloodGroupRequired].canReceive);

    this.validateBloodGroupsForDonation(permittedBloodGroup);

    /* if (this.bloodGroupRequired.endsWith('+')) {

    } else if (this.bloodGroupRequired.endsWith('-')) {

    } */
  }

  validateBloodGroupsForDonation(validBloodGroups: string[]) {

    console.log('validBloodGroups', validBloodGroups);

    // console.log('this.bloodBankData.positiveBloodData', this.bloodBankData.positiveBloodData[1]);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.bloodBankData.positiveBloodData.length; i++) {

      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < validBloodGroups[0].length; j++) {

        // console.log('validBloodGroups[j]', validBloodGroups[j]);
        // console.log('this.bloodBankData.positiveBloodData[i].bloodGroup', this.bloodBankData.positiveBloodData[i].bloodGroup);

        /* console.log(
          'validBloodGroups[j] === this.bloodBankData.positiveBloodData[i].bloodGroup',
          validBloodGroups[j] === this.bloodBankData.positiveBloodData[i].bloodGroup
        ); */

        if (validBloodGroups[0][j] === this.bloodBankData.positiveBloodData[i].bloodGroup) {

          this.bloodBankData.positiveBloodData[i].eligibleForDonation = true;
        } else {
          this.bloodBankData.negativeBloodData[i].eligibleForDonation = false;
        }
      }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.bloodBankData.negativeBloodData.length; i++) {

      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < validBloodGroups[0].length; j++) {

        if (validBloodGroups[0][j] === this.bloodBankData.negativeBloodData[i].bloodGroup) {

          console.log('validBloodGroups[j]', validBloodGroups[j]);
          console.log('this.bloodBankData.positiveBloodData[i]', this.bloodBankData.positiveBloodData[i]);

          this.bloodBankData.negativeBloodData[i].eligibleForDonation = true;
        } else {
          this.bloodBankData.negativeBloodData[i].eligibleForDonation = false;
        }
      }
    }
  }
}

