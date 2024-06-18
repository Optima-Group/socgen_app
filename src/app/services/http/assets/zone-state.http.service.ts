import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ZoneStateHttpService extends GenericHttpService<any, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "zonestates");
    }

    // getAssetState(item: AssetState): Observable<any> {
    //     return this.http.get(AppConfig.urlPrefix + this.url + `/sync`)
    //         .map((data: Response) => {
    //             return data.json();
    //         });
    // }


}