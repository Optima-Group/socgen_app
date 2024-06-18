import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { Partner } from '../../../model/api/documents/partner';

@Injectable()
export class PartnerHttpService extends GenericHttpService<Partner, number> {
    constructor(public http: Http) {
        super(http, "", "partners");
    }
}