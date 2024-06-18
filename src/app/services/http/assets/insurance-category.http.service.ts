import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { InsuranceCategory } from 'app/model/api/assets/insurance-category';

@Injectable()
export class InsuranceCategoryHttpService extends GenericHttpService<InsuranceCategory, number> {
    constructor(public http: Http) {
        super(http, '', 'insurancecategories');
    }
}
