import { AssetNiTransferSave } from './../../../model/api/assets/asset-ni-transfer-save';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';
import { URLSearchParams, Response, ResponseContentType, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AssetNi } from "app/model/api/assets/asset-ni";
import { AssetNiRecoSave } from "app/model/api/assets/asset-ni-reco-save";

@Injectable()
export class AssetNiHttpService extends GenericHttpService<AssetNi, number> {
    constructor(public http: Http) {
        super(http, '', 'assetsni/filters');
    }

    saveReco(reco: AssetNiRecoSave): Observable<any> {
        return super.create(reco, 'reco');
    }

    transfer(reco: AssetNiTransferSave): Observable<any> {
        return super.create(reco, 'transfer');
    }

    public exportAssetNiOtp(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportAsetNiOtp';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }

    public recoverAssetNi(assetId: number, inventoryId: number): Observable<any> {
        return this.http.put(AppConfig.urlPrefix + this.url + '/recoverAssetNi' +
         `/${assetId}/${inventoryId}`, {});
    }
}