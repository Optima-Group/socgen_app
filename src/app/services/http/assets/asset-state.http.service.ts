import { AssetState } from '../../../model/api/assets/asset-state';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from "../../../config";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssetStateHttpService extends GenericHttpService<any, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "assetstates");
    }

    // getAssetState(item: AssetState): Observable<any> {
    //     return this.http.get(AppConfig.urlPrefix + this.url + `/sync`)
    //         .map((data: Response) => {
    //             return data.json();
    //         });
    // }


}