import { AccMonthSave } from './../../../model/api/accounting/acc-month-save';
import { URLSearchParams, Response, ResponseContentType } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericHttpService } from '../generic.http.service';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';

@Injectable()
export class AccMonthHttpService extends GenericHttpService<AccMonth, number> {
    constructor(public http: Http) {
        super(http, "", "accmonths");
    }

    public getAccMonth(month: number, year: number): Observable<AccMonth> {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('month', month.toString()));
        params.push(new Param('year', year.toString()));

        return this.get(null, null, '', '', params, null).map((data: any) => {
                //return data != null ? data.json() : null;
                return data;
            });

        // return this.get('', '', params, null).subscribe((accMonths: Array<AccMonth>) => {
        //     return accMonths[0];
        // });
    }
}