import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Department } from '../../../model/api/administration/department';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';

@Injectable()
export class DepartmentHttpService extends GenericHttpService<Department, number> {
    constructor(public http: Http) {
        super(http, "", "departments");
    }
}