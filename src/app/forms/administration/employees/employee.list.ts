import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Employee } from '../../../model/api/administration/employee';
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "app/app-data";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";

@Component({
    selector: 'employee-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmployeeList extends GenericTableList<Employee, number> {
    private listName: string = 'EMPLOYEES';
    
    constructor(private translate: TranslateService) {
        super('internalCode', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}