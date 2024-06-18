import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { TranslateService } from '@ngx-translate/core';
import { Param } from "../../../model/common/param";
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { ZoneState } from 'app/model/api/assets/zone-state';

@Component({
    selector: 'zone-state-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ZoneStateList extends GenericTableList<ZoneState, number> {

    private listName: string = 'ZONESTATES';

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