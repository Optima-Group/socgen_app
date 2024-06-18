import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Administration } from '../../../model/api/administration/administration';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { Dimension } from 'app/model/api/administration/dimension';

@Component({
    selector: 'dimension-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DimensionList extends GenericTableList<Dimension, number> {

    private listName: string = 'DIMENSIONS';

    constructor(private translate: TranslateService) {
        super('length', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}
