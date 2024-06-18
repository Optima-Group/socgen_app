export class Type {
    id: number;
    code: string;
    name: string;
    masterTypeId: number;

    constructor(id: number, code: string, name: string, masterTypeId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.masterTypeId = masterTypeId;
    }
}
