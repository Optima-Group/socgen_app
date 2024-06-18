import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { Dimension } from 'app/model/api/administration/dimension';

@Injectable()
export class DimensionHttpService extends GenericHttpService<Dimension, number> {
    constructor(public http: Http) {
        super(http, '', 'dimensions');
    }
}