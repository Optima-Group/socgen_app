import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Uom } from 'app/model/api/assets/uom';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';

@Component({
    selector: 'uom-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class UomList extends GenericTableList<Uom, number> {
    private listName: string = 'UOMS';

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