import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { InvCompDetail } from '../../../model/api/inventory/inv-comp-detail';

@Component({
    selector: 'inv-comp-detail-list',
    templateUrl: 'inv-comp-detail.list.html'
})
export class InvCompDetailList extends GenericTableList<InvCompDetail, number> {
    constructor() {
        super('name1', 'asc');
    }
}