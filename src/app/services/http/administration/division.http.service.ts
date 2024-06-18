import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Division } from '../../../model/api/administration/division';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';

@Injectable()
export class DivisionHttpService extends GenericHttpService<Division, number> {
    constructor(public http: Http) {
        super(http, "", "divisions");
    }
}