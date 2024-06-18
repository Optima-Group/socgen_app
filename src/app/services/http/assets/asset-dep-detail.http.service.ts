import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';

@Injectable()
export class AssetDepDetailHttpService extends GenericHttpService<AssetDepDetail, number> {
    constructor(public http: Http) {
        super(http, "", "assets/depdetails");
    }
}