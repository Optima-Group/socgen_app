import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { DocumentType } from '../../../model/api/documents/document-type';

@Injectable()
export class DocumentTypeHttpService extends GenericHttpService<DocumentType, number> {
    constructor(public http: Http) {
        super(http, "", "documenttypes");
    }
}