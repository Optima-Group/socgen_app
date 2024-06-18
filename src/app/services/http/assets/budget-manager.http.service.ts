import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssetType } from '../../../model/api/assets/asset-type';
import { GenericHttpService } from '../generic.http.service';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Param } from 'app/model/common/param';
import { AppConfig } from 'app/config';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class BudgetManagerHttpService extends GenericHttpService<BudgetManager, number> {
    constructor(public http: Http) {
        super(http, "", "budgetmanagers");
    }

    public export(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }
}