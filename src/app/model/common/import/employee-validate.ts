export class EmployeeValidate {
    assetId: number;
    guid: string;
    accepted: boolean;
    reason: string;

    constructor(assetId: number, accepted: boolean, reason: string, guid: string) {
        this.assetId = assetId;
        this.accepted = accepted;
        this.reason = reason;
        this.guid = guid;
    }
}
