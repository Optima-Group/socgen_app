import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { InterCompany } from 'app/model/api/assets/inter-company';
import { Param } from 'app/model/common/param';
import { URLSearchParams } from '@angular/http';
import { AppConfig } from 'app/config';

@Injectable()
export class InterCompanyHttpService extends GenericHttpService<InterCompany, number> {
    constructor(public http: Http) {
        super(http, '', 'intercompanies');
    }

    public export(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }
}
