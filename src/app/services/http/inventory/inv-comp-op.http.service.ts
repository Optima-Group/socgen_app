import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { InvCompOp } from '../../../model/api/inventory/inv-comp-op';

@Injectable()
export class InvCompOpHttpService extends GenericHttpService<InvCompOp, number> {
    constructor(public http: Http) {
        super(http, "", "invcompops");
    }
}