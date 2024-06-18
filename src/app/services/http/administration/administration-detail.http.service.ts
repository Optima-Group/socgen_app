import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdministrationDetail } from '../../../model/api/administration/administration-detail';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AdministrationDetailHttpService extends GenericHttpService<AdministrationDetail, number> {
    constructor(public http: Http) {
        super(http, "", "administrations");
    }
}