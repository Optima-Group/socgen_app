import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Administration } from '../../../model/api/administration/administration';
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';
import { AssetComponent } from 'app/model/api/assets/asset-component';

@Component({
    selector: 'asset-component-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetComponentList extends GenericTableList<AssetComponent, number> {

    private listName: string = 'ASSETCOMPONENTS';

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
