
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { CostCenter } from '../../../model/api/administration/cost-center';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { Param } from 'app/model/common/param';
import { AppConfig } from 'app/config';



@Component({
    selector: 'cost-center-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CostCenterList extends GenericTableList<CostCenter, number> {
    private listName: string = 'COSTCENTERS';

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