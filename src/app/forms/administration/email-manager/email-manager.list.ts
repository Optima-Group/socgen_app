import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Administration } from '../../../model/api/administration/administration';
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "app/app-data";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';
import { EmailManager } from 'app/model/api/administration/email-manager';

@Component({
    selector: 'email-manager-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmailManagerList extends GenericTableList<EmailManager, number> {

    private listName: string = 'EMAILMANAGERS';

    constructor(private translate: TranslateService) {
        super('id', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}