export class ItemValidate {
    item: string;
    type: string;
    guid: string;
    reject: boolean;

    constructor(item: string, type: string, guid: string, reject: boolean) {
        this.item = item;
        this.type = type;
        this.guid = guid;
        this.reject = reject;
    }
}
