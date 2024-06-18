export class Document {

    id: number;
    documentTypeId: number;
    docNo1: string;
    docNo2: string;
    documentDate: Date;
    registerDate: Date;
    validated: boolean;
    details: string;
    serialNumber: string;
    fromDate: Date;
    toDate: Date;


    constructor(id: number, documentTypeId: number, docNo1: string, docNo2: string, documentDate: Date,
        registerDate: Date, validated: boolean, details: string, serialNumber: string, fromDate: Date, toDate: Date) {
        this.id = id;
        this.documentTypeId = documentTypeId;
        this.docNo1 = docNo1;
        this.docNo2 = docNo2;
        this.documentDate = documentDate;
        this.registerDate = registerDate;
        this.validated = validated;
        this.details = details;
        this.serialNumber = serialNumber;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}