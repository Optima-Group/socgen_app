import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetCategory } from '../../../model/api/assets/asset-category';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';

@Component({
    selector: 'asset-category-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetCategoryList extends GenericTableList<AssetCategory, number> {
    private listName: string = 'ASSETCATEGORIES';

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