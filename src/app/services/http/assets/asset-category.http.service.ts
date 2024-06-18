import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetCategoryHttpService extends GenericHttpService<AssetCategory, number> {
    constructor(public http: Http) {
        super(http, "", "assetcategories");
    }
}