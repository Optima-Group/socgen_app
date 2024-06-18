import { EmployeeImport } from './../../../model/common/import/employee-import';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { EmployeeDetail } from '../../../model/api/administration/employee-detail';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from './../../../config';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EmployeeDetailHttpService extends GenericHttpService<EmployeeDetail, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "employees");
    }

    public upload(item: EmployeeImport): Observable<void> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importEmployees',
            JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }
}