// import { AppConfig } from './../../../config';
// import { Http, Response } from '@angular/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

// import { GenericHttpService } from '../generic.http.service';
// import { AssetFullDetail } from '../../../model/api/assets/asset-full-detail';
// import { AssetImportV1 } from "app/model/common/import/asset-import-v1";
// import { AssetImportV2 } from "app/model/common/import/asset-import-v2";

// @Injectable()
// export class AssetFullDetailHttpService extends GenericHttpService<AssetFullDetail, number> {
//     constructor(public http: Http) {
//         super(http, "", "assets/detail");
//     }

//     public uploadV1(item: AssetImportV1): Observable<void> {
//         //console.log('service: ' + JSON.stringify(item));
//         return this.http.post(AppConfig.urlPrefix + this.url + '/importv1', 
//             JSON.stringify(item), { headers: this.headers })
//             .map((data: Response) => {
//                 return data.json();
//             });
//     }
//     public uploadV2(item: AssetImportV2): Observable<void> {
//         //console.log('serviceV1: ' + JSON.stringify(item));
//         return this.http.post(AppConfig.urlPrefix + this.url + '/importv2', 
//             JSON.stringify(item), { headers: this.headers })
//             .map((data: Response) => {
//                 return data.json();
//             });
//     }
// }