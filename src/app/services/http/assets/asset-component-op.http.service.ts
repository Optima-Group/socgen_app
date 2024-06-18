import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AssetComponentOp } from 'app/model/api/assets/asset-component-op';
import { AppConfig } from 'app/config';
import { Observable } from 'rxjs';


@Injectable()
export class AssetComponentOpHttpService extends GenericHttpService<AssetComponentOp, number> {
    constructor(public authHttp: AuthHttp) {
        super(authHttp, "", "assetcomponentops");
    }

    public deleteAssetComponentOp(assetComponentOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${assetComponentOpId}`)
        .map((data: Response) => {
            return data.json();
        });
    }
}