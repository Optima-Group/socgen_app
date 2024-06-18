import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetClassHttpService extends GenericHttpService<AssetClass, number> {
    constructor(public http: Http) {
        super(http, "", "assetclasses");
    }
}