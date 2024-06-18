export class AppState {
    id: number;
    code: string;
    name: string;
    parentCode: string;

    constructor(id: number, code: string, name: string, parentCode: string) {

        this.id = id;
        this.code = code;
        this.name = name;
        this.parentCode = parentCode;
    }
}