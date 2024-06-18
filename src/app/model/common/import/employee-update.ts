export class EmployeeUpdate {
    guid: string;
    headphones: string;
    headInfo: string;

    constructor(guid: string, headphones: string, headInfo: string) {
        this.guid = guid;
        this.headphones = headphones;
        this.headInfo = headInfo;
    }
}
