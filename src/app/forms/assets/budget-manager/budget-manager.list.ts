
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TranslateService } from '@ngx-translate/core';
import { Param } from 'app/model/common/param';
import { Region } from 'app/model/api/administration/region';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';

@Component({
    selector: 'budget-manager-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class BudgetManagerList extends GenericTableList<BudgetManager, number> {
    private listName: string = 'BUDGETMANAGERS';

    constructor(private translate: TranslateService) {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}