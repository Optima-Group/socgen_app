import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { GenericHttpService } from '../generic.http.service';
import { Account } from 'app/model/api/administration/account';

@Injectable()
export class AccountHttpService extends GenericHttpService<Account, number> {
    constructor(public http: Http) {
        super(http, "", "accounts");
    }
}