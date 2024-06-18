import { Document } from './document';
import { Operation } from './operation';

export class DocumentUpload {
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

    operations: Array<Operation>;

    // constructor(document: Document, operations: Array<Operation>, assetOpId?: number, assetOpStateId?: number) {
    //     this.document = document;
    //     this.operations = operations;
    // }
}