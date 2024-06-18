
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TranslateService } from '@ngx-translate/core';
import { Param } from 'app/model/common/param';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { InterCompany } from 'app/model/api/assets/inter-company';

@Component({
    selector: 'inter-company-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InterCompanyList extends GenericTableList<InterCompany, number> {
    private listName: string = 'INTERCOMPANIES';

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