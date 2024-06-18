import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ZoneStateDetailHttpService extends GenericHttpService<any, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "zonestates/details");
    }
}