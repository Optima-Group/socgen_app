import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { PartnerLocation } from 'app/model/api/documents/partner-location';

@Injectable()
export class PartnerLocationHttpService extends GenericHttpService<PartnerLocation, number> {
    constructor(public http: Http) {
        super(http, "", "partnerlocations");
    }
}