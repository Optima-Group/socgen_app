import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { InventoryDetail } from 'app/forms/inventory/inventory.detail';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InventoryDetailHttpService extends GenericHttpService<InventoryDetail, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "inventories");
    }
}