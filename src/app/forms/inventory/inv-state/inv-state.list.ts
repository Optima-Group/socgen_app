
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { InvState } from '../../../model/api/inventory/inv-state';
import { TranslateService } from '@ngx-translate/core';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from "app/theme/services";
import { Param } from "app/model/common/param";
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';

@Component({
    selector: 'inv-state-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InvStateList extends GenericTableList<InvState, number> {

    private listName: string = 'INVSTATES';

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