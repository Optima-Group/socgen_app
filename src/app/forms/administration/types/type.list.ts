import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Location } from '../../../model/api/administration/location';
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "app/app-data";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";
import { Type } from 'app/model/api/administration/type';

@Component({
    selector: 'type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class TypeList extends GenericTableList<Type, number> {
    private listName: string = 'TYPES';

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