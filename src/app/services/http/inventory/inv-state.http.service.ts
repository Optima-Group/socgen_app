import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { InvState } from "app/model/api/inventory/inv-state";

@Injectable()
export class InvStateHttpService extends GenericHttpService<InvState, number> {
    constructor(public http: Http) {
        super(http, '', 'invstates');
    }
}