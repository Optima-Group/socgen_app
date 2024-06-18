import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdministrationDetail } from '../../../model/api/administration/administration-detail';
import { GenericHttpService } from '../generic.http.service';
import { DictionaryItemDetail } from 'app/forms/administration/dictionary-item/dictionary-item.detail';
import { EmailManagerDetail } from 'app/model/api/administration/email-manager-detail';

@Injectable()
export class EmailManagerDetailHttpService extends GenericHttpService<EmailManagerDetail, number> {
    constructor(public http: Http) {
        super(http, "", "emailmanagers");
    }
}