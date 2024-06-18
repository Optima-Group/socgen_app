import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { AssetCategoryDetail } from 'app/model/api/assets/asset-category-detail';
import { AssetComponentDetail } from 'app/model/api/assets/asset-component-detail';

@Injectable()
export class AssetComponentDetailHttpService extends GenericHttpService<AssetComponentDetail, number> {
    constructor(public http: Http) {
        super(http, '', 'assetcomponents');
    }
}