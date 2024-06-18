import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { AssetComponent } from 'app/model/api/assets/asset-component';
import { AssetComponentAdd } from 'app/model/api/assets/asset-component-add';
import { AppConfig } from 'app/config';
import { AssetTransferAdd } from 'app/model/api/assets/asset-transfer-add';
import { AssetComponentTransferAdd } from 'app/model/api/assets/asset-component-transfer-add';
import { Param } from 'app/model/common/param';

@Injectable()
export class AssetComponentHttpService extends GenericHttpService<AssetComponent, number> {
    constructor(public http: Http) {
        super(http, "", "assetcomponents");
    }

    public addAssetComponentByEmployee(reco: AssetComponentAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', JSON.stringify(reco), { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }

    public deleteAssetComponent(assetComponentId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${assetComponentId}`)
        .map((data: Response) => {
            return data.json();
        });
    }

    public addAssetByEmployee(reco: AssetComponentTransferAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/addTransfer', JSON.stringify(reco), { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }

    public exportIT(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportIT';
      
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
      }
}