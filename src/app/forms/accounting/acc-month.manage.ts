import { AccMonthHttpService } from './../../services/http/accounting/acc-month.http.service';
import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { AccMonth } from "app/model/api/accounting/acc-month";
import { GenericManage } from "app/forms/generic/generic.manage";

@Component({
    selector: 'acc-month-manage',
    templateUrl: 'acc-month.manage.html',
    providers: [ AccMonthHttpService ]
})
export class AccMonthManage extends GenericManage<AccMonth, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private accMonthHttpService: AccMonthHttpService, private translate: TranslateService) {
        super();
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    protected detailInitialize() {
        this.modal.show();
    }

    protected detailTerminate() {
        this.modal.hide();
    }

    private saveAccMonth(){
        
    }
}
