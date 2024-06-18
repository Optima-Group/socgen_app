
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AuthHttp } from 'angular2-jwt';
import { UserReport } from 'app/model/api/common/user-report';
import { AppConfig } from 'app/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserReportHttpService extends GenericHttpService<UserReport, number> {
    constructor(public http: AuthHttp) {
        super(http, '', 'userreports');
    }

    public createReportId(): Observable<UserReport> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/new', { headers: this.headers })
            .map((response) => {
                return response.json();
            });
    }
}