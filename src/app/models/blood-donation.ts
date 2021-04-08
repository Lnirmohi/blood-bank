export class BloodDonation {
    constructor(
        private bloodGroup: string,
        private canGive: string[],
        private canReceive: string[]
    ) {}
}
