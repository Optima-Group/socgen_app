import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssetType } from '../../../model/api/assets/asset-type';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetTypeHttpService extends GenericHttpService<AssetType, number> {
    constructor(public http: Http) {
        super(http, '', 'assettypes');
    }
}
