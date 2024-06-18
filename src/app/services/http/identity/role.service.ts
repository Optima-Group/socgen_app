import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt';
import { AppConfig } from "app/config";
import { GenericHttpService } from "app/services/http/generic.http.service";
//import { User } from "app/model/api/identity/user";

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable()
export class RoleService extends GenericHttpService<any, string> {

    headers: Headers;
    options: RequestOptions;

    constructor(public http: Http, private authHttp: AuthHttp) {

        super(authHttp, "", "roles");

        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public GetAll(): Observable<any> {
        return this.authHttp.get("/api/roles")
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);

            });
    }

    getDetailById(id: string): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/role/${id}`)
            .map((data: Response) => {
                return data.json();
            });
    }

}
