import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Division } from '../../../model/api/administration/division';
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "app/app-data";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";
import { DictionaryType } from 'app/model/api/administration/dictionary-type';
import { EmailType } from 'app/model/api/administration/email-type';

@Component({
    selector: 'email-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmailTypeList extends GenericTableList<EmailType, number> {
    private listName: string = 'EMAILTYPES';
    
    constructor(private translate: TranslateService) {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);

        console.log(this.totalItems);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}