import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { Company } from 'app/model/api/assets/company';

@Injectable()
export class CompanyHttpService extends GenericHttpService<Company, number> {
    constructor(public http: Http) {
        super(http, '', 'companies');
    }
}
