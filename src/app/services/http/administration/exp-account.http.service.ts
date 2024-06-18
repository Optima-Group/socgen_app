import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class ExpAccountHttpService extends GenericHttpService<ExpAccount, number> {
    constructor(public http: Http) {
        super(http, "", "expaccounts");
    }
}