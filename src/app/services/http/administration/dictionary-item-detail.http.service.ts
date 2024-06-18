import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdministrationDetail } from '../../../model/api/administration/administration-detail';
import { GenericHttpService } from '../generic.http.service';
import { DictionaryItemDetail } from 'app/forms/administration/dictionary-item/dictionary-item.detail';

@Injectable()
export class DictionaryItemDetailHttpService extends GenericHttpService<DictionaryItemDetail, number> {
    constructor(public http: Http) {
        super(http, "", "dictionaryitems");
    }
}