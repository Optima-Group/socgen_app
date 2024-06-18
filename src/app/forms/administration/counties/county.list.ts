import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';
import { County } from 'app/model/api/administration/county';

@Component({
    selector: 'county-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CountyList extends GenericTableList<County, number> {
    private listName: string = 'COUNTIES';

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