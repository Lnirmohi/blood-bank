export class DonatedBlood {
    bloodGroup: string;
    countPresent: number;
    eligibleForDonation: boolean;

    constructor(
        bloodGroup: string,
        countPresent: number,
        eligibleForDonation: boolean
    ) {
        this.bloodGroup = bloodGroup;
        this.countPresent = countPresent;
        this.eligibleForDonation = eligibleForDonation;
    }
}
