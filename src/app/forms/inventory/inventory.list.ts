import { Component } from '@angular/core';

import { TranslateService } from "@ngx-translate/core";
import { Inventory } from 'app/model/api/inventory/inventory';
import { Param } from 'app/model/common/param';
import { GenericTableList } from '../generic/generic.table.list';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';

@Component({
    selector: 'inventory-list',
    templateUrl: '../generic/generic.table.list.html'
})
export class InventoryList extends GenericTableList<Inventory, number> {

    private listName: string = 'INVENTORIES';

    constructor(private translate: TranslateService) {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}