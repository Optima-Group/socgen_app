import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { MasterType } from 'app/model/api/assets/master-type';

@Injectable()
export class MasterTypeHttpService extends GenericHttpService<MasterType, number> {
    constructor(public http: Http) {
        super(http, '', 'mastertypes');
    }
}
