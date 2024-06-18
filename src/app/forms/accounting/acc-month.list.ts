import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AccMonth } from "app/model/api/accounting/acc-month";
import { GenericTableList } from "app/forms/generic/generic.table.list";

@Component({
    selector: 'acc-month-list',
    templateUrl: 'acc-month.list.html'
})
export class AccMonthList extends GenericTableList<AccMonth, number> {
    receiveData: string;
    selectLang = this.receiveData;

    constructor(private translate: TranslateService) {
        super('id', 'desc');

        translate.use(this.receiveData);
    }

}