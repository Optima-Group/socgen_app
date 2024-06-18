import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { InvCompDetail } from '../../../model/api/inventory/inv-comp-detail';

@Injectable()
export class InvCompDetailHttpService extends GenericHttpService<InvCompDetail, number> {
    constructor(public http: Http) {
        super(http, "", "invcomps/detail");
    }
}