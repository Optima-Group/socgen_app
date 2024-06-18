import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';
import { InsuranceCategory } from 'app/model/api/assets/insurance-category';

@Component({
    selector: 'insurance-category-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InsuranceCategoryList extends GenericTableList<InsuranceCategory, number> {
    private listName: string = 'INSURANCECATEGORIES';

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