import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { SyncStatus } from 'app/model/api/administration/sync-status';
import { AppConfig } from 'app/config';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class SyncStatusHttpService extends GenericHttpService<SyncStatus, number> {
    constructor(public http: AuthHttp) {
        super(http, '', 'syncstatus');
    }

    public import(file: any, reportType: string) {
        let input = new FormData();
        input.append('file', file);
        input.append('reportType', reportType);
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input)
            .map((data: Response) => {
                return data.json();
            });
    }
}