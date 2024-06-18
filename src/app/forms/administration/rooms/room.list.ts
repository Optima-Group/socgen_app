import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { Room } from '../../../model/api/administration/room';
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "app/app-data";
import { AppConfig } from "app/config";
import { Param } from "app/model/common/param";

@Component({
    selector: 'room-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class RoomList extends GenericTableList<Room, number> {

    private listName: string = 'ROOMS';

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