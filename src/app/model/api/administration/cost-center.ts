export class CostCenter {
    id: number;
    code: string;
    name: string;
    admCenterId: number;

    constructor(id: number, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}