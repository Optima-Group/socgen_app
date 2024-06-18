export class DocumentType {
    id: number;
    code: string;
    name: string;
    parentCode: string;
    mask: string;
    isActive: boolean;
    prefix: string;
    suffix: string;

    constructor(id: number, code: string, name: string, parentCode: string, mask: string, isActive: boolean,
        prefix: string, suffix: string) {

        this.id = id;
        this.code = code;
        this.name = name;
        this.parentCode = parentCode;
        this.mask = mask;
        this.isActive = isActive;
        this.prefix = prefix;
        this.suffix = suffix;
    }
}