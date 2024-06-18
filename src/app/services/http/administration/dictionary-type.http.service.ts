import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Division } from '../../../model/api/administration/division';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { DictionaryType } from 'app/model/api/administration/dictionary-type';

@Injectable()
export class DictionaryTypeHttpService extends GenericHttpService<DictionaryType, number> {
    constructor(public http: Http) {
        super(http, "", "dictionarytypes");
    }
}