
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TranslateService } from '@ngx-translate/core';
import { Param } from 'app/model/common/param';
import { Region } from 'app/model/api/administration/region';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { AssetNature } from 'app/model/api/assets/asset-nature';

@Component({
    selector: 'asset-nature-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetNatureList extends GenericTableList<AssetNature, number> {
    private listName: string = 'ASSETNATURES';

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