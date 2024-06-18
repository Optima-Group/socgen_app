import { AssetState } from '../../../model/api/assets/asset-state';

import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';


import { TranslateService } from '@ngx-translate/core';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from "../../../theme/services";
import { Param } from "../../../model/common/param";
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';

@Component({
    selector: 'asset-state-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetStateList extends GenericTableList<AssetState, number> {

    private listName: string = 'ASSETSTATES';

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