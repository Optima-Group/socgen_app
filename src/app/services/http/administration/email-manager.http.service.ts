import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Administration } from '../../../model/api/administration/administration';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';
import { EmailManager } from 'app/model/api/administration/email-manager';
import { EmailManagerReason } from 'app/model/api/common/email-manager-reason';

@Injectable()
export class EmailManagerHttpService extends GenericHttpService<EmailManager, number> {
    constructor(public http: Http) {
        super(http, "", "emailmanagers");
    }

    addNewReason(email: EmailManagerReason): Observable<EmailManagerReason> {
        let url: string = AppConfig.urlPrefix + this.url + '/declined';

        return this.http.post(url, JSON.stringify(email), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }
}