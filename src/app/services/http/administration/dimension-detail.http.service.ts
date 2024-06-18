import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { DimensionDetail } from 'app/forms/assets/dimensions/dimension.detail';

@Injectable()
export class DimensionDetailHttpService extends GenericHttpService<DimensionDetail, number> {
    constructor(public http: Http) {
        super(http, '', 'dimensions');
    }
}