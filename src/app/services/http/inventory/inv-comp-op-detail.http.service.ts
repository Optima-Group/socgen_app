import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { InvCompOpDetail } from '../../../model/api/inventory/inv-comp-op-detail';

@Injectable()
export class InvCompOpDetailHttpService extends GenericHttpService<InvCompOpDetail, number> {
    constructor(public http: Http) {
        super(http, "", "invcompops/detail");
    }
}