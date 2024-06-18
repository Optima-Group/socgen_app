import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DepartmentDetail } from '../../../model/api/administration/department-detail';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';

@Injectable()
export class DepartmentDetailHttpService extends GenericHttpService<DepartmentDetail, number> {
    constructor(public http: Http) {
        super(http, "", "departments/details");
    }
}