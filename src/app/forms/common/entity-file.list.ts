import { Component } from '@angular/core';
import { EntityFile } from "app/model/api/common/entity-file";
import { GenericTableList } from "app/forms/generic/generic.table.list";
import { TranslateService } from '@ngx-translate/core';
import { AppData } from 'app/app-data';
import { AppConfig } from 'app/config';
import { Param } from 'app/model/common/param';

// @Component({
//     selector: 'entity-file-list',
//     templateUrl: 'entity-file.list.html'
// })
// export class EntityFileList extends GenericTableList<EntityFile, number> {
//     constructor() {
//         super('name', 'asc');
//     }
// }


@Component({
    selector: 'entity-file-list',
    templateUrl: '../generic/generic.table.list.html'
})
export class EntityFileList extends GenericTableList<EntityFile, number> {
    private listName: string = 'ENTITYFILES';

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