import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { InvCompOpDetail } from '../../../model/api/inventory/inv-comp-op-detail';
import { AppConfig } from "app/config";

@Component({
    selector: 'inv-comp-op-detail-list',
    templateUrl: 'inv-comp-op-detail.list.html'
})
export class InvCompOpDetailList extends GenericTableList<InvCompOpDetail, number> {

    private showEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;

    constructor() {
        super('id', 'asc');
    }
}