import { ColumnHeader } from './../../../model/common/column-header';
import { ColumnDefinition } from './../../../model/common/column-definition';
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AppConfig } from "app/config";
import { AssetOpSd } from "app/model/api/assets/asset-op-sd";
import { AppData } from "app/app-data";
import { Param } from "app/model/common/param";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'asset-op-detail-list',
    templateUrl: '../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ],
})
export class AssetOpDetailList extends GenericTableList<any, number> {

    private showEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;
    private listTemplate: string = 'OPERATIONS';

    constructor(private translate: TranslateService) {
        super('modifiedAt', 'desc', 'details');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];

        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }
}