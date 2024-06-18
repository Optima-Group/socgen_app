export class SubType {
    id: number;
    code: string;
    name: string;
    typeId: number;

    constructor(id: number, code: string, name: string, typeId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.typeId = typeId;
    }
}
