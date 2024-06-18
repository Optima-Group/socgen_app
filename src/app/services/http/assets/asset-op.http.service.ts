import { AssetOpConfirm } from '../../../model/api/assets/asset-op-confirm';
import { Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { AssetOp } from "app/model/api/assets/asset-op";
import { AssetOpSd } from "app/model/api/assets/asset-op-sd";
import { AssetOpConf } from "app/model/common/import/asset-op-conf";


@Injectable()
export class AssetOpHttpService extends GenericHttpService<AssetOp, number> {
    constructor(public authHttp: AuthHttp) {
        super(authHttp, "", "assetops");
    }

    public getSimpleDetailByAsset(assetId: number): Observable<Array<AssetOpSd>> {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('assetId', assetId.toString()));

        // return this.get<AssetOpSd>('', '', params, null).map((data: any) => {
        //     return data;
        // });
        return this.httpGet(0, 0, 0, '', '', params, 'simpledetail').map((data: any) => {
            return data;
        });
    }
    public getSimpleDetail(): Observable<Array<AssetOpSd>> {
        let params: Array<Param> = new Array<Param>();

        return this.httpGet(0, 0, 0, '', '', params, 'simpledetailnotValidate').map((data: any) => {
            return data;
        });
    }

    public upload(item: AssetOpConf): Observable<void> {
        console.log('IMPORT: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/importConfirmation',
            JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public process(assetOpIds: number[]): Observable<any> {
        return super.create(assetOpIds, 'process');
    }

    public exportAssetOps(assetOpId: number): Observable<any> {
        return super.create(assetOpId, 'exportAssetOps');
    }

    public sendEmail(item: AssetOpConfirm[]): Observable<void> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmail', item,
            { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public sendEmailBnr(item: AssetOpConfirm[]): Observable<void> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmailBnr', item,
            { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public sendEmailPiraeus(item: AssetOpConfirm[]): Observable<void> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmailPiraeus', item,
            { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public downloadMailOps(item: AssetOpConfirm[]): Observable<void> {
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/downloadMailOps', item,
        { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }

    public downloadMailOpsBnr(item: AssetOpConfirm[]): Observable<void> {
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/downloadMailOpsBnr', item,
        { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }

    public download() {
        let url = AppConfig.urlPrefix + this.url + '/download';

        // return this.http.get(url, { responseType: ResponseContentType.ArrayBuffer })
        //                 .map(res => res.arrayBuffer());
        return this.http.get(url, { responseType: ResponseContentType.Blob })
                        .map(res => res.blob());
    }

    public downloadBnr() {
        let url = AppConfig.urlPrefix + this.url + '/downloadBnr';

        // return this.http.get(url, { responseType: ResponseContentType.ArrayBuffer })
        //                 .map(res => res.arrayBuffer());
        return this.http.get(url, { responseType: ResponseContentType.Blob })
                        .map(res => res.blob());
    }

    public import(file: any) {
        let input = new FormData();
        input.append('file', file);
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input);
    }

    public deleteAssetOp(assetOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetOpId}`);
    }

    public validateAssetOpTemp(assetOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/validateAssetOpTemp' + `/${assetOpId}`);
    }

    public exportBM(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportBM';
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }
}