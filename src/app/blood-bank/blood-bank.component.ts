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
  bloodDonationCriteriaData: JSON;

  bloodGroupRequired: string;
  numberOfBottlesRequired: number;
  bloodContainerList: DonatedBlood[];
  dropAllowedOnContainer: boolean;

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
    this.dropAllowedOnContainer = true;
    this.bloodContainerList = [];
  }

  addToBloodContainerList(donatedBlood: DonatedBlood) {
    this.bloodContainerList.push(donatedBlood);
  }

  disableBloodContainerList() {
    this.dropAllowedOnContainer = false;
  }

  nextTab(event) {
    this._bloodBankData.positiveBloodData = [];
    this._bloodBankData.negativeBloodData = [];

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
  }

  checkBloodGroupAvailibility(bloodGroupRequiredData) {

    const permittedBloodGroup = [];

    this.bloodGroupRequired = bloodGroupRequiredData.bloodGroupRequired;
    this.numberOfBottlesRequired = bloodGroupRequiredData.numberOfBottle;

    permittedBloodGroup.push(...this.bloodDonationCriteriaData[this.bloodGroupRequired].canReceive);

    this.validateBloodGroupsForDonation(permittedBloodGroup, this.numberOfBottlesRequired);

    console.log('this.bloodBankData => ', this.bloodBankData);
  }

  validateBloodGroupsForDonation(validBloodGroups: string[], bottleCountRequired: number) {

    validBloodGroups.forEach( bloodGroup => {

      if (bloodGroup.endsWith('+')) {

        this.bloodBankData.positiveBloodData.forEach( (bloodData, index) => {

          if (
            bloodData.bloodGroup === bloodGroup &&
            bloodData.countPresent >= bottleCountRequired
            ) {
            this.bloodBankData.positiveBloodData[index].eligibleForDonation = true;
            // this.eligibleBloodList.push(this.bloodBankData.positiveBloodData[index]);
          }
        });
      } else if (bloodGroup.endsWith('-')) {

        this.bloodBankData.negativeBloodData.forEach( (bloodData, index) => {

          if (
            bloodData.bloodGroup === bloodGroup &&
            bloodData.countPresent >= bottleCountRequired
            ) {
            this.bloodBankData.negativeBloodData[index].eligibleForDonation = true;
            // this.eligibleBloodList.push(this.bloodBankData.positiveBloodData[index]);
          }
        });
      }
    });
  }

  bloodCardDropped(event: any) {

    const donatedBloodGroup: string = event.dragData.bloodGroup;

    if (donatedBloodGroup.endsWith('+')) {

      this.removeBloodCountFromBank('positiveBloodData', donatedBloodGroup);
    } else if (donatedBloodGroup.endsWith('-')) {

      this.removeBloodCountFromBank('negativeBloodData', donatedBloodGroup);
    }
  }

  removeBloodCountFromBank(bloodGroup: string, donatedBloodGroup: string) {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.bloodBankData[bloodGroup].length; i++) {

      if (this.bloodBankData[bloodGroup][i].bloodGroup === donatedBloodGroup) {

        this.bloodBankData[bloodGroup][i].countPresent -= this.numberOfBottlesRequired;

        this.addToBloodContainerList(
          new DonatedBlood(donatedBloodGroup, this.numberOfBottlesRequired, false)
        );

        this.disableBloodContainerList();
        break;
      }
    }
  }
}
