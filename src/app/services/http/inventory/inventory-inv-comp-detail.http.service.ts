import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { InventoryInvCompDetail } from '../../../model/api/inventory/inventory-inv-comp-detail';

@Injectable()
export class InventoryInvCompDetailHttpService extends GenericHttpService<InventoryInvCompDetail, number> {
    constructor(public http: Http) {
        super(http, "", "invcomps/inventory");
    }
}