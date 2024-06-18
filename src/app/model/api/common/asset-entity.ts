export class AssetEntity {
    id: number;
    invNo: string;
    name: string;

    constructor (id: number, invNo: string, name: string) {
        this.id = id;
        this.invNo = invNo;
        this.name = name;
    }
}