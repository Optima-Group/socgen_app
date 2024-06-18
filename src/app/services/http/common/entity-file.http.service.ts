import { Http, ResponseContentType, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { EntityFile } from "app/model/api/common/entity-file";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EntityFileHttpService extends GenericHttpService<EntityFile, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "entityfiles");
    }

    public download(entityFileId: number) {
        let url = AppConfig.urlPrefix + this.url + '/download' + `/${entityFileId}`;

        // return this.http.get(url, { responseType: ResponseContentType.ArrayBuffer })
        //                 .map(res => res.arrayBuffer());
        return this.http.get(url, { responseType: ResponseContentType.Blob })
                        .map(res => res.blob());
    }

    public upload(fileToUpload: any, entityId: number, entityTypeCode: string, info: string) {
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("entityId", entityId.toString());
        input.append("entityTypeCode", entityTypeCode);
        input.append("info", info);

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input);
    }

    // public getByEntity(entityTypeCode: string, entityId: number): Observable<EntityFile> {
    //     let params: Array<Param> = new Array<Param>();

    //     params.push(new Param('entityTypeCode', entityTypeCode));
    //     params.push(new Param('entityId', entityId.toString()));

    //     return this.get(null, null, '', '', params, null).map((data: any) => {
    //             //return data != null ? data.json() : null;
    //             return data;
    //         });
    // }

    public getByEntity(entityTypeCode: string, entityId: number): Observable<Array<EntityFile>> {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', entityTypeCode));
        params.push(new Param('entityId', entityId.toString()));

        return this.get(null, null, null, null, params, null).map((data: any) => {
                return data;
            });
    }

    public deleteEntityFile(entityFileId: number): Observable<any> {
        return this.http.put(AppConfig.urlPrefix + this.url + '/delete' + `/${entityFileId}`, [])
        .map((data: Response) => {
            return data.json();
        });
    }
}