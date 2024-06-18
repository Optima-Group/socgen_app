import { ProgressBarService } from 'app/services/http/common/progress-bar.service';
import { Param } from './../../../model/common/param';
import { AssetState } from '../../../model/api/assets/asset-state';
import { URLSearchParams, Response, ResponseContentType } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from 'app/config';
import { AssetUpload } from 'app/model/api/assets/asset-upload';
import { AssetImportV1 } from 'app/model/common/import/asset-import-v1';
import { AssetImportV2 } from 'app/model/common/import/asset-import-v2';
import { AssetSave } from 'app/model/api/assets/asset-save';
import { AuthHttp } from 'angular2-jwt';
@Injectable()
export class AssetRecoHttpService extends GenericHttpService<any, number> {
    constructor(public http: AuthHttp, private progressBarService: ProgressBarService) {
        super(http, '', 'assets/reco');
    }

    getDetailById(id: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/detail/${id}`)
            .map((data: Response) => {
                return data.json();
            });
    }

    addNewAsset(item: AssetSave): Observable<number> {
        let url: string = AppConfig.urlPrefix + this.url + '/detail';

        return this.http.post(url, JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    updateAsset(item: AssetSave): Observable<Response> {
        let url: string = AppConfig.urlPrefix + this.url + '/detail';
        return this.http.put(url, JSON.stringify(item), { headers: this.headers });
    }

    public uploadV1(item: AssetImportV1): Observable<void> {
        console.log(JSON.stringify(item));
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv1',
            JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }
    public uploadV2(item: AssetImportV2): Observable<void> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv2',
            JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

  public deleteAssetOp(assetId: number, inventoryId: number ): Observable<any> {
    console.log(AppConfig.urlPrefix + this.url + `/${assetId}`, inventoryId);
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetId}, ${inventoryId}`);
}

public exportIn(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportIn';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public exportOtp(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOtp';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public exportOut(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOut';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public import(file: any) {
    let input = new FormData();
    input.append('file', file);
    this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/upload', input)
        .map((data: Response) => {
            return data.json();
        });
}

public importCassation(file: any) {
    let input = new FormData();
    input.append('file', file);
    this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadCassation', input);
}

public importInventory(file: any) {
    let input = new FormData();
    input.append('file', file);
    this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadInv', input);
}

public exportDemo(inventoryId: number, regionId: number, locationId: number, roomId: number) {
    let searchParams: URLSearchParams = null;
 //   let url = AppConfig.urlPrefix + 'reporting/exportMegaImage&inventoryId=${inventoryId}&locationId=${locationId}';
    let url = `${AppConfig.urlPrefix}reporting/locationdownload/${regionId}/${locationId}/${roomId}`;

    searchParams = this.getSearchParams(null);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public deleteAsset(assetId: number): Observable<any> {
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAsset' + `/${assetId}`);
}

public checkUniqueAsset(invNo: string) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUnique' + `/${invNo}`, { headers: this.headers })
    .map((data: Response) => {
        return data;
    });
}

public getLastInvNo() {
    return this.http.get(AppConfig.urlPrefix + this.url + '/getLastInvNo', { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public export(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public invChart(locationId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryChart' + `/${locationId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditChart(locationId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditChart' + `/${locationId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

}
