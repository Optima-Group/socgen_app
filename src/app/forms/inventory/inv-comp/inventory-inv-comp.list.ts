import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { InventoryInvCompDetail } from '../../../model/api/inventory/inventory-inv-comp-detail';

@Component({
    selector: 'inventory-inv-comp-list',
    templateUrl: 'inventory-inv-comp.list.html'
})
export class InventoryInvCompList extends GenericTableList<InventoryInvCompDetail, number> {
    constructor() {
        super('name', 'asc');
    }
}