import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Administration } from '../../../model/api/administration/administration';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';

@Injectable()
export class AdministrationHttpService extends GenericHttpService<Administration, number> {
    constructor(public http: Http) {
        super(http, "", "administrations");
    }
}