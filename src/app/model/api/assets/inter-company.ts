export class InterCompany {
    id: number;
    code: string;
    name: string;
    partnerId: number;

    constructor(id: number, code: string, name: string, partnerId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.partnerId = partnerId;
    }
}
