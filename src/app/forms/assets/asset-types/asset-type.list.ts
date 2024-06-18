import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetType } from '../../../model/api/assets/asset-type';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';

@Component({
    selector: 'asset-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetTypeList extends GenericTableList<AssetType, number> {
    private listName: string = 'ASSETTYPES';

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