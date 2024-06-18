import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { Country } from 'app/model/api/administration/country';

@Injectable()
export class CountryHttpService extends GenericHttpService<Country, number> {
    constructor(public http: Http) {
        super(http, '', 'countries');
    }
}