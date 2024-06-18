import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { InvCompOpInvDetail } from '../../../model/api/inventory/inv-comp-op-inv-detail';

@Injectable()
export class InvCompOpInvDetailHttpService extends GenericHttpService<InvCompOpInvDetail, number> {
    constructor(public http: Http) {
        super(http, "", "invcompops/invdetails");
    }
}