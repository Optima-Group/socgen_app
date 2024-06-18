import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';

@Injectable()
export class AssetInvDetailHttpService extends GenericHttpService<AssetInvDetail, number> {
    constructor(public http: Http) {
        super(http, "", "assets/invdetails");
    }
}