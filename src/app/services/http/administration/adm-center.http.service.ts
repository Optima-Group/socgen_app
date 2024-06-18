import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AdmCenterHttpService extends GenericHttpService<AdmCenter, number> {
    constructor(public http: Http) {
        super(http, "", "admcenters");
    }
}