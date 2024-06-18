import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Administration } from '../../../model/api/administration/administration';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';

@Injectable()
export class DictionaryItemHttpService extends GenericHttpService<DictionaryItem, number> {
    constructor(public http: Http) {
        super(http, "", "dictionaryItems");
    }
}