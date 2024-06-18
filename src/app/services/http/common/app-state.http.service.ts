import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AppState } from 'app/app.service';
import { AppConfig } from 'app/config';

@Injectable()
export class AppStateHttpService extends GenericHttpService<AppState, number> {
    constructor(public http: Http) {
        super(http, "", "appstates");
    }

    getDetailByParentCode(parentCode: string): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/parentCode/${parentCode}`)
            .map((data: Response) => {
                return data.json();
            });
    }
}