import { Http, URLSearchParams, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { Inventory } from "../../../model/api/inventory/inventory";
import { AppConfig } from "../../../config";
import { Param } from "../../../model/common/param";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InventoryHttpService extends GenericHttpService<Inventory, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "inventories");
    }

    // public deleteOperation(inventoryId: number, assetId: number): Observable<any> {
    //     //console.log(AppConfig.urlPrefix + this.url + `/${assetId}`, inventoryId);
    //     //return this.http.delete(AppConfig.urlPrefix + this.url + '/operation' + `/${assetId}, ${inventoryId}`);
    // }

    public audit(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/audit';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }

    public disable(): Observable<void> {
        return this.http.put(AppConfig.urlPrefix + this.url + '/disable'
            , { headers: this.headers })
            .map(() => {});
    }
}