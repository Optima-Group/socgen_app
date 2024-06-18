import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Region } from '../../../model/api/administration/region';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class RegionHttpService extends GenericHttpService<Region, number> {
    constructor(public http: Http) {
        super(http, "", "regions");
    }
}