import { Http, ResponseContentType, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from 'app/model/common/param';
import { URLSearchParams } from '@angular/http';
import { Type } from 'app/model/api/administration/type';

@Injectable()
export class TypeHttpService extends GenericHttpService<Type, number> {
    constructor(public http: Http) {
        super(http, "", "types");
    }


    public export(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }

    public getData(): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url , { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }
}