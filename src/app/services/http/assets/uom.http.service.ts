import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { Uom } from 'app/model/api/assets/uom';

@Injectable()
export class UomHttpService extends GenericHttpService<Uom, number> {
    constructor(public http: Http) {
        super(http, "", "uoms");
    }
}