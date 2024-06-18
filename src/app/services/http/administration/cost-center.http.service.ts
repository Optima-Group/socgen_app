import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Response, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from "app/model/common/param";


@Injectable()
export class CostCenterHttpService extends GenericHttpService<CostCenter, number> {
    // constructor(public http: Http) {
    //     super(http, "", "costcenters");
    // }
    constructor(private authHttp: AuthHttp) {
        super(authHttp, "", "costcenters");
    }

    public export(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }

}