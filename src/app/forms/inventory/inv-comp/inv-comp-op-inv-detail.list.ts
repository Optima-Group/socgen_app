import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { InvCompOpInvDetail } from '../../../model/api/inventory/inv-comp-op-inv-detail';

@Component({
    selector: 'inv-comp-op-inv-detail-list',
    templateUrl: 'inv-comp-op-inv-detail.list.html'
})
export class InvCompOpInvDetailList extends GenericTableList<InvCompOpInvDetail, number> {
    constructor() {
        super('code1', 'asc');
    }
}